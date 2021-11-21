const { Readable } = require('stream');
const fs = require('fs');

class ReadableStream extends Readable {
  constructor(filename) {
    super();

    this.filename = filename;
    this.fd = 0;
  }

  _construct(callback) {
    fs.open(this.filename, (_, fd) => {
      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.fd, buf, 0, size, null, (_, bytesRead) => {
      this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
    });
  }
}

module.exports = ReadableStream;
