const customStreams = require('./custom-streams');
const { InvalidConfigError } = require('./custom-errors');

const getTransformStream = (cipher) => {
  switch (cipher) {
    case 'C0':
    case 'C1':
      return new customStreams.CaesarTransform(cipher);
    case 'R0':
    case 'R1':
      return new customStreams.Rot8Transform(cipher);
    case 'A':
      return new customStreams.AtbashTransform(cipher);
    default:
      throw new InvalidConfigError(`"${cipher}" cipher mark not found`);
  }
};

module.exports = {
  getTransformStream,
};
