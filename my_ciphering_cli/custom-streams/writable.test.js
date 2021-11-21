const fs = require('fs');
const WritableStream = require('./writable');

describe('WritableStream', () => {
  it('should call _construct method', () => {
    jest.spyOn(fs, 'open');
    const existingFilePath = './output.txt';
    const writestream = new WritableStream(existingFilePath, {});
    writestream._construct(() => {});
    expect(fs.open).toHaveBeenCalled();
    fs.open.mockRestore();
  });

  it('should call _write method', () => {
    jest.spyOn(fs, 'write');
    const existingFilePath = './output.txt';
    const writestream = new WritableStream(existingFilePath);
    writestream._write('hello', 'utf-8', () => {});
    expect(fs.write).toHaveBeenCalled();
    fs.write.mockRestore();
  });
});
