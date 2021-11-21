const fs = require('fs');
const path = require('path');
const { FileNotFoundError, InvalidArgumentError } = require('../custom-errors');
const {
  hasAccess,
  getReadStream,
  getWriteStream,
  getTransformStream,
  getTransformStreams,
} = require('./utils');

describe('Testing hasAccess', () => {
  it('should return true if file is accessible', () => {
    const existingPathToFile = path.join(__dirname, '../input.txt');

    return expect(hasAccess(existingPathToFile, fs.constants.R_OK)).resolves.toBe(true);
  });

  it('should throw an error if file is not accessible', () => {
    const nonExistingPathToFile = path.join(__dirname, '../inputs.txt');

    return expect(hasAccess(nonExistingPathToFile, fs.constants.R_OK)).rejects.toThrow(
      FileNotFoundError,
    );
  });
});

describe('Testing getReadStream', () => {
  it('should return readstream', async () => {
    jest.spyOn(fs, 'open');
    const existingPathToFile = path.join(__dirname, '../input.txt');
    const readstream = await getReadStream(existingPathToFile);

    readstream._construct(() => {});
    expect(fs.open).toHaveBeenCalled();
    fs.open.mockRestore();
  });
});

describe('Testing getWriteStream', () => {
  it('should return writestream', async () => {
    jest.spyOn(fs, 'open');
    const existingPathToFile = path.join(__dirname, '../output.txt');
    const readstream = await getWriteStream(existingPathToFile);

    readstream._construct(() => {});
    expect(fs.open).toHaveBeenCalled();
    fs.open.mockRestore();
  });
});

describe('Testing getTransformStream', () => {
  it.each(['C0', 'C1', 'R0', 'R1', 'A'])('should return transform stream', (config) => {
    const stream = getTransformStream(config);

    expect(stream.cipher).toBe(config);
  });

  it('should throw an error if cipher mark is not valid', () => {
    expect(() => {
      getTransformStream('C2');
    }).toThrow(InvalidArgumentError);
  });
});

describe('Testing getTransformStreams', () => {
  it('should return array of transform streams', () => {
    const config = 'C1-C0-R0-A';
    const configArr = config.split('-');
    const streams = getTransformStreams(config);

    streams.forEach((stream, index) => {
      expect(stream.cipher).toBe(configArr[index]);
    });
  });

  it('should throw an error if config is empty', () => {
    const config = '';
    expect(() => {
      getTransformStreams(config);
    }).toThrow(InvalidArgumentError);
  });
});
