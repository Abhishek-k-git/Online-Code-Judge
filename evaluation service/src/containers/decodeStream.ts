import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

interface StreamInterface {
  stdout: string;
  stderr: string;
}

function decodeDockerStream(buffer: Buffer): StreamInterface {
   let offset = 0;
   const output: StreamInterface = { stdout: "", stderr: "" };

   while (offset < buffer.length) {
      const typeOfStream = buffer[offset]; // stdout (type 1) or stderr (type 2)

      const length = buffer.readUint32BE(offset + 4);

      offset += DOCKER_STREAM_HEADER_SIZE;

      if (typeOfStream === 1) {
         output.stdout += buffer.toString("utf-8", offset, offset + length);
      } else if (typeOfStream === 2) {
         output.stderr += buffer.toString("utf-8", offset, offset + length);
      }

      offset += length; // move offset to next chunk
   }

   return output;
}

export default decodeDockerStream;
