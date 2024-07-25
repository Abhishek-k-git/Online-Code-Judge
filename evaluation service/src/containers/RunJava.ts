import ExecuteInterface, { ExecuteResType } from "../types/execute.type";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./createContainer";
import decodeDockerStream from "./decodeStream";
import pullImage from "./pullImage";

class RunJava implements ExecuteInterface {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<ExecuteResType> {
    const rawLogBuffer: Buffer[] = [];
    let javaContainer;

    try {
      await pullImage(JAVA_IMAGE);

      const runCommand = `echo '${code.replace(
        /'/g,
        `'\\"`
      )}' > Main.java && javac Main.java && echo '${inputTestCase.replace(
        /'/g,
        `'\\"`
      )}' | java Main`;

      console.log("\nExecuting...\n", runCommand, "\n");

      javaContainer = await createContainer(JAVA_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand,
      ]);

      await javaContainer.start();

      const loggerStream = await javaContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true,
      });

      const codeResponse: string = await this.fetchDecodedStream(
        loggerStream,
        rawLogBuffer
      );

      if (codeResponse.trim() === outputTestCase.trim()) {
        return { output: codeResponse, status: "SUCCESS" };
      } else {
        return { output: codeResponse, status: "WA" };
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Time Limit Exceeded") {
          return { output: "Time Limit Exceeded", status: "TLE" };
        } else if (error.message.includes("OOMKilled")) {
          return { output: "Memory Limit Exceeded", status: "MLE" };
        } else {
          return { output: error.message, status: "RE" };
        }
      } else {
        console.error("Execution error:", error);
        return { output: "Unknown Error", status: "UNKNOWN" };
      }
    } finally {
      try {
        if (javaContainer) {
          const containerInfo = await javaContainer.inspect();
          if (containerInfo && containerInfo.State.Status === "running") {
            await javaContainer.stop();
          }
          await javaContainer.remove();
        }
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    }
  }

  async fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawLogBuffer: Buffer[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        loggerStream.removeAllListeners(); // Remove all event listeners
        reject(new Error("Time Limit Exceeded"));
      }, 2000);

      loggerStream.on("data", (chunk) => {
        rawLogBuffer.push(chunk);
      });

      loggerStream.on("end", () => {
        clearTimeout(timeout);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);

        if (decodedStream.stderr) {
          reject(new Error(decodedStream.stderr));
        } else {
          resolve(decodedStream.stdout);
        }
      });

      loggerStream.on("error", (err) => {
        clearTimeout(timeout);
        reject(err); // Forward any stream errors
      });
    });
  }
}

export default RunJava;
