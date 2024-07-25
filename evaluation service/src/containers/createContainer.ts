import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, // to enable input streams
    AttachStdout: true, // to enable output streams
    AttachStderr: true, // to enable error streams
    Tty: false,
    HostConfig: {
      Memory: 1000 * 1024 * 1024 * 1.5, // 1.5GB
    },
    OpenStdin: true, // keep the input stream open even no interaction is there
  });

  return container;
}

export default createContainer;
