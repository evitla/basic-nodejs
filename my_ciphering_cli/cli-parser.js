const { correspondFlag } = require('./constants');
const { InvalidArgumentError } = require('./custom-errors');
const handleError = require('./error-handler');

const commands = process.argv.slice(2);

const checkArgument = (flag) => {
  const cf = correspondFlag[flag];
  const countFlag = commands.filter((command) => command === flag || command === cf).length;

  if (countFlag > 1) {
    throw new InvalidArgumentError(`"${flag}/${cf}" found multiple argument.`);
  }
};

const getValue = (flag) => {
  try {
    checkArgument(flag);
  } catch (err) {
    handleError(err);
  }

  const flagIndex = commands.indexOf(flag);
  return flagIndex !== -1 ? commands[flagIndex + 1] : null;
};

module.exports = {
  config: getValue('-c') || getValue(correspondFlag['-c']),
  inputFile: getValue('-i') || getValue(correspondFlag['-i']),
  outputFile: getValue('-o') || getValue(correspondFlag['-o']),
};
