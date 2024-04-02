class CustomException extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.message = message;
  }
}

module.exports = { CustomException };