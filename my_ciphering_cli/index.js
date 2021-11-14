const path = require('path');
const { pipeline } = require('stream');
const { stdin, stdout } = process;

const { config, inputFile, outputFile } = require('./cli-parser');
const handleError = require('./error-handler');
const { getReadStream, getWriteStream, getTransformStreams } = require('./custom-streams/utils');

const main = async (src, dest) => {
  const readStream = src !== null ? await getReadStream(path.join(__dirname, src)) : stdin;
  const writeStream = dest !== null ? await getWriteStream(path.join(__dirname, dest)) : stdout;
  const transformStreams = getTransformStreams(config);

  pipeline(readStream, ...transformStreams, writeStream, (err) => {
    if (err) handleError(err);
  });
};

main(inputFile, outputFile).catch(handleError);
