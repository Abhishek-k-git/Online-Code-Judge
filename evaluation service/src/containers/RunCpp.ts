import ExecuteInterface, { ExecuteResType } from "../types/execute.type";
import { CPP_IMAGE } from "../utils/constants";
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
    let cppContainer;

    try {
      await pullImage(CPP_IMAGE);

      const runCommand = `echo '${code.replace(
        /'/g,
        `'\\"`
      )}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(
        /'/g,
        `'\\"`
      )}' | ./main`;

      console.log("\nExecuting...\n", runCommand, "\n");

      cppContainer = await createContainer(CPP_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand,
      ]);

      await cppContainer.start();

      const loggerStream = await cppContainer.logs({
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
        if (cppContainer) {
          const containerInfo = await cppContainer.inspect();
          if (containerInfo && containerInfo.State.Status === "running") {
            await cppContainer.stop();
          }
          await cppContainer.remove();
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
      }, 4000);

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
