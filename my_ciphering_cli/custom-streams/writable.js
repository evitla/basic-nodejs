const { Writable } = require('stream');
const fs = require('fs');

class WritableStream extends Writable {
  constructor(filename, options) {
    super(options);

    this.filename = filename;
    this.options = options;
    this.fd = 0;
  }

  _construct(callback) {
    fs.open(this.filename, this.options?.flags || 'w', (_, fd) => {
      this.fd = fd;
      callback();
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
}

module.exports = WritableStream;
