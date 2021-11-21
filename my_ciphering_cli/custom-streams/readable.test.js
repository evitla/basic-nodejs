const fs = require('fs');
const path = require('path');
const ReadableStream = require('./readable');

describe('ReadableStream', () => {
  it('should implement Caesar cipher', () => {
    jest.spyOn(fs, 'open');
    const existingFilePath = './inputs.txt';
    const readstream = new ReadableStream(existingFilePath);
    readstream._construct(() => {});
    expect(fs.open).toHaveBeenCalled();
    fs.open.mockRestore();
  });

  it('should implement Caesar cipher', () => {
    jest.spyOn(fs, 'read');
    const existingFilePath = './inputs.txt';
    const readstream = new ReadableStream(existingFilePath);
    readstream._read(512);
    expect(fs.read).toHaveBeenCalled();
    fs.read.mockRestore();
  });
});
