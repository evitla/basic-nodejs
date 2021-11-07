const { Transform } = require('stream');

const cipher = require('./cipher');
const { config } = require('./cli-parser');
const { caesarShift, rot8Shift } = require('./constants');

const configMap = {
  C0: cipher(caesarShift),
  C1: cipher(-caesarShift),
  R0: cipher(rot8Shift),
  R1: cipher(-rot8Shift),
  A: cipher(),
};

class CipherTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, cb) {
    let cryptedText = chunk.toString();

    for (const c of config.split('-')) {
      cryptedText = configMap[c](cryptedText);
    }

    this.push(cryptedText);
    cb();
  }
}

module.exports = CipherTransform;
