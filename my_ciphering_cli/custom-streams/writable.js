const { Writable } = require('stream');
const fs = require('fs');

class WritableStream extends Writable {
  constructor(filename, options) {
    super(options);

    this.filename = filename;
    this.options = options;
  }

  _construct(callback) {
    fs.open(this.filename, this.options?.flags || 'w', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = WritableStream;
