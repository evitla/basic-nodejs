const { Transform } = require('stream');

const cipher = require('../cipher');
const { caesarShift, rot8Shift } = require('../constants');

const configMap = {
  C0: cipher(caesarShift),
  C1: cipher(-caesarShift),
  R0: cipher(rot8Shift),
  R1: cipher(-rot8Shift),
  A: cipher(),
};

class CustomTransform extends Transform {
  constructor(cipher) {
    super();

    this.cipher = cipher;
  }

  _transform(chunk, encoding, cb) {
    const cryptedText = configMap[this.cipher](chunk.toString());

    this.push(cryptedText);
    cb();
  }
}

class CaesarTransform extends CustomTransform {
  constructor(cipher) {
    super(cipher);
  }
}

class Rot8Transform extends CustomTransform {
  constructor(cipher) {
    super(cipher);
  }
}

class AtbashTransform extends CustomTransform {
  constructor(cipher) {
    super(cipher);
  }
}

module.exports = {
  CaesarTransform,
  Rot8Transform,
  AtbashTransform,
};
