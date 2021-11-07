const { stdout } = process;
const { allowedFlags } = require('./constants');

const commands = process.argv.slice(2);

const getValue = (flag) => {
  if (!allowedFlags.includes(flag)) {
    stdout.write(`Command ${flag} not found. Only -c, -i and -o commands are allowed!\n`);
    process.exit();
  }

  const flagIndex = commands.indexOf(flag);
  return commands[flagIndex + 1];
};

module.exports = {
  config: getValue('-c'),
  inputFile: getValue('-i'),
  outputFIle: getValue('-o'),
};
