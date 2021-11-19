const cipher = require('./cipher');

describe('Cipher function', () => {
  it('should implement Caesar cipher', () => {
    const a = cipher(-1)('Hello, World!');
    expect(a).toBe('Gdkkn, Vnqkc!');
  });

  it('should skip non-latin characters', () => {
    const a = cipher(-1)('Привет, World!');
    expect(a).toBe('Привет, Vnqkc!');
  });

  it('should implement Atbash', () => {
    const a = cipher()('Hello, World!');
    expect(a).toBe('Svool, Dliow!');
  });
});
