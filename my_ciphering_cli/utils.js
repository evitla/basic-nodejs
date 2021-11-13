const fs = require('fs');

const customStreams = require('./custom-streams');
const { InvalidConfigError, FileNotFoundError } = require('./custom-errors');

const hasAccess = (filename, mode) => {
  return new Promise((resolve, reject) => {
    fs.access(filename, mode, (err) => {
      if (err) {
        reject(
          new FileNotFoundError(`"${filename}" doesn't exist or no permission to read/write.`),
        );
      }

      resolve(true);
    });
  });
};

const getReadStream = async (filename) =>
  (await hasAccess(filename, fs.constants.R_OK))
    ? new customStreams.ReadableStream(filename)
    : null;

const getWriteStream = async (filename) =>
  (await hasAccess(filename, fs.constants.W_OK))
    ? new customStreams.WritableStream(filename, { flags: 'a' })
    : null;

const getTransformStream = (cipher) => {
  switch (cipher) {
    case 'C0':
    case 'C1':
      return new customStreams.CaesarTransform(cipher);
    case 'R0':
    case 'R1':
      return new customStreams.Rot8Transform(cipher);
    case 'A':
      return new customStreams.AtbashTransform(cipher);
    default:
      throw new InvalidConfigError(`"${cipher}" cipher mark not found`);
  }
};

module.exports = {
  getReadStream,
  getWriteStream,
  getTransformStream,
};
