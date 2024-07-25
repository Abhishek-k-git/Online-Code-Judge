import ExecuteInterface, { ExecuteResType } from "../types/execute.type";
import { PYTHON_IMAGE } from "../utils/constants";
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
    let pythonContainer;

    try {
      await pullImage(PYTHON_IMAGE);

      const runCommand = `echo '${code.replace(
        /'/g,
        `'\\"`
      )}' > test.py && echo '${inputTestCase.replace(
        /'/g,
        `'\\"`
      )}' | python3 test.py`;

      console.log("\nExecuting...\n", runCommand, "\n");

      pythonContainer = await createContainer(PYTHON_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand,
      ]);

      await pythonContainer.start();

      const loggerStream = await pythonContainer.logs({
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
        if (pythonContainer) {
          const containerInfo = await pythonContainer.inspect();
          if (containerInfo && containerInfo.State.Status === "running") {
            await pythonContainer.stop();
          }
          await pythonContainer.remove();
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
