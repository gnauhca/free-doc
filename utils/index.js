const path = require('path');
const clc = require("cli-color");

module.exports = {
  log(message, type = 'notice') {
    const colorMap = {
      error: clc.red.bold,
      warn: clc.yellow,
      notice: clc.blue,
      success: clc.green
    };

    console.log(colorMap[type]('ten: ' + message));
  },
  resolvePath(p1, relative) {
    if (/^[@\\/]/.test(p1) || !relative) {
      return p1
    }
    const dir = path.dirname(relative);

    return path.join(dir, p1);
  },
  resolveCwd() {
    const args = [].slice.call(arguments, 0);
    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },
  resolveRoot() {
    const args = [].slice.call(arguments, 0);
    args.unshift('../');
    args.unshift(__dirname);
    return path.join.apply(path, args);
  }
};
