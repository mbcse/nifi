const { spawn } = require("child_process");

async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, { shell: true });

    // Log stdout data in real-time
    childProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    // Log stderr data in real-time
    childProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    childProcess.on("error", (error) => {
      reject(new Error(`Error executing command: ${error.message}`));
    });

    childProcess.on("disconnect", () => {
      console.log("Child process disconnected");
    });

    childProcess.on("message", (message) => {
      console.log(`Received message from child process: ${message}`);
    });
  });
}

module.exports = {
  runCommand,
};
