const fs = require('fs');
const ReadableStream = require('./readable');

describe('ReadableStream', () => {
  it('should call _construct method', () => {
    jest.spyOn(fs, 'open');
    const existingFilePath = './input.txt';
    const readstream = new ReadableStream(existingFilePath);
    readstream._construct(() => {});
    expect(fs.open).toHaveBeenCalled();
    fs.open.mockRestore();
  });

  it('should call _read method', () => {
    jest.spyOn(fs, 'read');
    const existingFilePath = './input.txt';
    const readstream = new ReadableStream(existingFilePath);
    readstream._read(512);
    expect(fs.read).toHaveBeenCalled();
    fs.read.mockRestore();
  });
});
