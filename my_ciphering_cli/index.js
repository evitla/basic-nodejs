const path = require('path');
const { pipeline } = require('stream');

const { config, inputFile, outputFile } = require('./cli-parser');
const customStreams = require('./custom-streams');
const { InvalidConfigError } = require('./custom-errors');
const handleError = require('./error-handler');

const { stdin, stdout } = process;

const getCipherTransforms = () =>
  config.split('-').map((cipher) => {
    switch (cipher[0]) {
      case 'C':
        return new customStreams.CaesarTransform(cipher);
      case 'R':
        return new customStreams.Rot8Transform(cipher);
      case 'A':
        return new customStreams.AtbashTransform(cipher);
      default:
        throw new InvalidConfigError(`"${cipher}" cipher mark not found`);
    }
  });

try {
  const readableStream = inputFile
    ? new customStreams.ReadableStream(path.join(__dirname, inputFile))
    : stdin;
  const writableStream = outputFile
    ? new customStreams.WritableStream(path.join(__dirname, outputFile), { flags: 'a' })
    : stdout;

  pipeline(readableStream, ...getCipherTransforms(), writableStream, (err) => {
    if (err) {
      handleError(err);
    }
  });
} catch (err) {
  handleError(err);
}
