function StringValidator() {}

StringValidator.prototype.isValid = function isValidString(value) {
  return false;
};

StringValidator.prototype.required = function isExists() {
  return this;
};

// TODO Do I need to check if we pass not a string here?
StringValidator.prototype.contains = function contains(value) {
  return this;
};

export default StringValidator;
