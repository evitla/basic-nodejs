const path = require('path');
const { pipeline } = require('stream');
const { stdin, stdout } = process;

const { correspondFlag } = require('./constants');
const { getValue } = require('./cli-parser');
const handleError = require('./error-handler');
const { getReadStream, getWriteStream, getTransformStreams } = require('./custom-streams/utils');

const main = async (commands) => {
  const config = getValue('-c', commands) || getValue(correspondFlag['-c'], commands);
  const src = getValue('-i', commands) || getValue(correspondFlag['-i'], commands);
  const dest = getValue('-o', commands) || getValue(correspondFlag['-o'], commands);

  const readStream = src !== null ? await getReadStream(path.join(__dirname, src)) : stdin;
  const writeStream = dest !== null ? await getWriteStream(path.join(__dirname, dest)) : stdout;
  const transformStreams = getTransformStreams(config);

  pipeline(readStream, ...transformStreams, writeStream, (err) => {
    if (err) handleError(err);
  });
};

module.exports = main;
