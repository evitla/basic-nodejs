class CustomError extends Error {
  constructor(message) {
    super(message);
    this.isCustom = true;
  }
}

class InvalidConfigError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InvalidConfigError';
  }
}

class FileNotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'FileNotFoundError';
  }
}

module.exports = {
  InvalidConfigError,
  FileNotFoundError,
};
