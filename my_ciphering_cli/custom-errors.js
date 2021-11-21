class CustomError extends Error {
  constructor(message) {
    super(message);
    this.isCustom = true;
  }
}

class InvalidArgumentError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgumentError';
  }
}

class FileNotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'FileNotFoundError';
  }
}

module.exports = {
  InvalidArgumentError,
  FileNotFoundError,
};
