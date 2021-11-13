const path = require('path');
const { pipeline } = require('stream');

const { config, inputFile, outputFile } = require('./cli-parser');
const customStreams = require('./custom-streams');
const handleError = require('./error-handler');
const { getTransformStream } = require('./utils');

const { stdin, stdout } = process;

const transformStreams = config.split('-').map((cipher) => {
  try {
    return getTransformStream(cipher);
  } catch (err) {
    handleError(err);
  }
});

const readableStream = inputFile
  ? new customStreams.ReadableStream(path.join(__dirname, inputFile))
  : stdin;
const writableStream = outputFile
  ? new customStreams.WritableStream(path.join(__dirname, outputFile), { flags: 'a' })
  : stdout;

pipeline(readableStream, ...transformStreams, writableStream, (err) => {
  if (err) {
    handleError(err);
  }
});
