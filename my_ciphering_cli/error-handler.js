const handleError = (err) => {
  const { isCustom } = err;

  if (isCustom) {
    process.stderr.write(`${err.name}: ${err.message}\n`);
    process.exit(1);
  } else {
    throw err;
  }
};

module.exports = handleError;
