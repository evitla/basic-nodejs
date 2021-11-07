const { lettersLen } = require('./constants');

const cipherChar = (shift, char) => {
  const cipher = (charCode) =>
    shift === null
      ? (lettersLen - charCode - 1) % lettersLen
      : (lettersLen + charCode + shift) % lettersLen;

  const aLetterCode = char === char.toUpperCase() ? 'A'.charCodeAt() : 'a'.charCodeAt();
  const charCode = char.charCodeAt() - aLetterCode;

  return charCode >= 0 && charCode < lettersLen
    ? String.fromCharCode(cipher(charCode) + aLetterCode)
    : char;
};

module.exports =
  (shift = null) =>
  (text) =>
    text.split('').reduce((acc, char) => (acc += cipherChar(shift, char)), '');
