const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const { config, inputFile, outputFile } = require('./cli-parser');
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

const readableStream = inputFile ? fs.createReadStream(path.join(__dirname, inputFile)) : stdin;
const writableStream = outputFile ? fs.createWriteStream(path.join(__dirname, outputFile)) : stdout;

pipeline(readableStream, ...cipherTransforms, writableStream, (err) => {
  if (err) {
    process.stderr.write(`Error: ${err.message}`);
    process.exit(1);
  }
});
