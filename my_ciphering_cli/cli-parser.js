const { stdout } = process;
const { allowedFlags } = require('./constants');

const commands = process.argv.slice(2);

const getValue = (flag) => {
  if (!allowedFlags.includes(flag)) {
    stdout.write(`Command ${flag} not found. Only -c, -i and -o commands are allowed!\n`);
    process.exit();
  }

  const flagIndex = commands.indexOf(flag);
  return flagIndex !== -1 ? commands[flagIndex + 1] : null;
};

module.exports = {
  config: getValue('-c') || getValue('--config'),
  inputFile: getValue('-i') || getValue('--input'),
  outputFile: getValue('-o') || getValue('--output'),
};
