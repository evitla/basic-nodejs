const { correspondFlag } = require('./constants');
const { InvalidArgumentError } = require('./custom-errors');

const checkArgument = (flag, commands) => {
  const cf = correspondFlag[flag];
  const countFlag = commands.filter((command) => command === flag || command === cf).length;

  if (countFlag > 1) {
    throw new InvalidArgumentError(`"${flag}/${cf}" found multiple argument.`);
  }
};

const getValue = (flag, commands) => {
  if (commands.length === 1) return null;

  checkArgument(flag, commands);

  const flagIndex = commands.indexOf(flag);

  if (flagIndex === commands.length - 1) {
    throw new InvalidArgumentError(`Command line ends with "${flag}". Pass the argument.`);
  }

  return flagIndex !== -1 ? commands[flagIndex + 1] : null;
};

module.exports = {
  getValue,
};
