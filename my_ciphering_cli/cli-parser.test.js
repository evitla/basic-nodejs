const { getValue } = require('./cli-parser');
const { InvalidArgumentError } = require('./custom-errors');

describe('Testing cli-parser', () => {
  it.each([
    { flag: '-c', expected: 'C1-C1-R0-A' },
    { flag: '--config', expected: 'C1-C1-R0-A' },
    { flag: '-i', expected: './input.txt' },
    { flag: '--input', expected: './input.txt' },
    { flag: '-o', expected: './output.txt' },
    { flag: '--output', expected: './output.txt' },
  ])('should get value if arguments are correct', ({ flag, expected }) => {
    const commands = `${flag} ${expected}`;
    const value = getValue(flag, commands.split(' '));

    expect(value).toBe(expected);
  });

  it('should return null if command is empty', () => {
    const commands = '';
    const value = getValue('-c', commands.split(' '));

    expect(value).toBe(null);
  });

  it('should return null if flag not found', () => {
    const flag = '-c';
    const commands = '-i ./input.txt';
    const value = getValue(flag, commands.split(' '));

    expect(value).toBe(null);
  });

  it('should throw an error if flag is at the end', () => {
    const flag = '-o';
    const commands = `-c C1-C1-R0-A -i ./input.txt ${flag}`;

    expect(() => {
      getValue(flag, commands.split(' '));
    }).toThrow(InvalidArgumentError);
  });

  it('should throw an error if flag is duplicated', () => {
    const flag = '-i';
    const commands = `-c C1-C1-R0-A ${flag} ./input.txt -o output.txt ${flag}`;

    expect(() => {
      getValue(flag, commands.split(' '));
    }).toThrow(InvalidArgumentError);
  });
});
