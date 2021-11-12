const path = require('path');
const { pipeline } = require('stream');

const { config, inputFile, outputFile } = require('./cli-parser');
const CustomReadable = require('./custom-readable');
const CustomWritable = require('./custom-writable');
const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer');

const { stdin, stdout } = process;

const cipherTransforms = config.split('-').map((cipher) => {
  switch (cipher[0]) {
    case 'C':
      return new CaesarTransform(cipher);
    case 'R':
      return new Rot8Transform(cipher);
    case 'A':
      return new AtbashTransform(cipher);
    default:
      process.stderr.write(`Error: "${cipher}" cipher mark not found\n`);
      process.exit(1);
  }
});

const readableStream = inputFile ? new CustomReadable(path.join(__dirname, inputFile)) : stdin;
const writableStream = outputFile
  ? new CustomWritable(path.join(__dirname, outputFile), { flags: 'a' })
  : stdout;

pipeline(readableStream, ...cipherTransforms, writableStream, (err) => {
  if (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exit(1);
  }
});
