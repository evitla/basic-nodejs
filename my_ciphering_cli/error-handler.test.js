const { CustomError } = require('./custom-errors');
const handleError = require('./error-handler');

describe('Testing handleError', () => {
  it('should exit with code 1 if error is custom', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const err = new CustomError('Custom error');

    handleError(err);
    expect(mockExit).toHaveBeenCalledWith(1);
    process.exit.mockRestore();
  });

  it('should throw an error if error is not custom', () => {
    const err = new Error('Not custom error');

    expect(() => {
      handleError(err);
    }).toThrow(Error);
  });
});
