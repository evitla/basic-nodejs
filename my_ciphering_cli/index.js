const fs = require('fs');
const path = require('path');

const { inputFile, outputFIle } = require('./cli-parser');
const CipherTransform = require('./transformer');

const cipher = new CipherTransform();

const readableStream = fs.createReadStream(path.join(__dirname, inputFile));
const writableStream = fs.createWriteStream(path.join(__dirname, outputFIle));

readableStream.pipe(cipher).pipe(writableStream);
