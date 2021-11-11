const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const { inputFile, outputFile } = require('./cli-parser');
const CipherTransform = require('./transformer');

const cipher = new CipherTransform();

const readableStream = inputFile ? fs.createReadStream(path.join(__dirname, inputFile)) : stdin;
const writableStream = outputFile ? fs.createWriteStream(path.join(__dirname, outputFile)) : stdout;

readableStream.pipe(cipher).pipe(writableStream);
