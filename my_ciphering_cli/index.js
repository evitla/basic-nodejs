const path = require('path');
const { pipeline } = require('stream');

const { config, inputFile, outputFile } = require('./cli-parser');
const CustomReadable = require('./custom-readable');
const CustomWritable = require('./custom-writable');
const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer');
const { InvalidConfigError } = require('./custom-errors');
const handleError = require('./error-handler');

const { stdin, stdout } = process;

const getCipherTransforms = () =>
  config.split('-').map((cipher) => {
    switch (cipher[0]) {
      case 'C':
        return new CaesarTransform(cipher);
      case 'R':
        return new Rot8Transform(cipher);
      case 'A':
        return new AtbashTransform(cipher);
      default:
        throw new InvalidConfigError(`"${cipher}" cipher mark not found`);
    }
  });

try {
  const readableStream = inputFile ? new CustomReadable(path.join(__dirname, inputFile)) : stdin;
  const writableStream = outputFile
    ? new CustomWritable(path.join(__dirname, outputFile), { flags: 'a' })
    : stdout;

  pipeline(readableStream, ...getCipherTransforms(), writableStream, (err) => {
    if (err) {
      handleError(err);
    }
  });
} catch (err) {
  handleError(err);
}
