const { CustomError } = require('./custom-errors');

describe('Testing CustomError', () => {
  it('should have isCustom property to be true', () => {
    const err = new CustomError();

    expect(err.isCustom).toBe(true);
  });
});
