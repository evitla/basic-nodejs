const customStreams = require('./custom-streams');
const { InvalidConfigError } = require('./custom-errors');

const transformStream = (cipher) => {
  switch (cipher[0]) {
    case 'C':
      return new customStreams.CaesarTransform(cipher);
    case 'R':
      return new customStreams.Rot8Transform(cipher);
    case 'A':
      return new customStreams.AtbashTransform(cipher);
    default:
      throw new InvalidConfigError(`"${cipher}" cipher mark not found`);
  }
};

module.exports = {
  transformStream,
};
