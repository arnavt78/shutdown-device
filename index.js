const childProcess = require("child_process");

const _isRoot = () => process.getuid && process.getuid() === 0;

const _errIfNoRoot = () => {
  if (!_isRoot()) {
    throw new Error(
      "Node.js must be run as the root user in order for the 'shutdown' command to work."
    );
  }
};

const shutdown = (options = { time: 0, comment: "" }) => {
  if (process.platform === "win32") {
    if (options.comment.length > 512) {
      throw new Error("Maximum length of comment allowed is 512 characters.");
    } else if (options.time < 0 || options.time > 315360000) {
      throw new RangeError(
        `Range for the time until shutdown is 0-315360000 seconds (received ${options.time})`
      );
    }

    childProcess.execSync(
      `shutdown -s -t ${options.time}${!options.comment.trim() ? "" : ` -c "${options.comment}"`}`
    );
  }
};

module.exports = { shutdown };
