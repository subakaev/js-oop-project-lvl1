function isString(value) {
  return typeof value === 'string' || value == null;
}

function isRequired(value) {
  return value != null && value !== '';
}

function contains(param) {
  return function check(value) {
    return value?.includes(param);
  };
}

function minLength(length) {
  return function check(value) {
    return value?.length >= length;
  };
}

function StringValidator() {
  this.validators = [isString];
}

StringValidator.prototype.isValid = function isValidString(value) {
  return this.validators.every((validate) => validate(value));
};

StringValidator.prototype.required = function isExists() {
  this.validators.push(isRequired);
  return this;
};

// TODO Do I need to check if we pass not a string here?
StringValidator.prototype.contains = function check(value) {
  this.validators.push(contains(value));
  return this;
};

StringValidator.prototype.minLength = function check(value) {
  this.validators.push(minLength(value));
  return this;
};

export default StringValidator;
