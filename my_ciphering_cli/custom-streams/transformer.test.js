const { Rot8Transform, AtbashTransform } = require('.');
const { CaesarTransform } = require('./transformer');

describe('Custom Transform', () => {
  it('should implement Caesar cipher', () => {
    const t = new CaesarTransform('C0');
    t.on('data', (d) => {
      expect(d.toString()).toEqual('Gdkkn, Vnqkc!');
    });

    t._transform('Hello, World!', 'UTF-8', () => {});
  });

  it('should implement Rot-8 cipher', () => {
    const t = new Rot8Transform('R1');
    t.on('data', (d) => {
      expect(d.toString()).toEqual('Pmttw, Ewztl!');
    });

    t._transform('Hello, World!', 'UTF-8', () => {});
  });

  it('should implement Atbash cipher', () => {
    const t = new AtbashTransform('A');
    t.on('data', (d) => {
      expect(d.toString()).toEqual('Svool, Dliow!');
    });

    t._transform('Hello, World!', 'UTF-8', () => {});
  });
});
