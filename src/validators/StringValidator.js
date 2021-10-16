function StringValidator() {
  this.validators = [isString];
}

StringValidator.prototype.isValid = function isValidString(value) {
  console.log(this);
  return this.validators.every((validate) => validate(value));
};

StringValidator.prototype.required = function isExists() {
  this.validators.push(isRequired);
  return this;
};

// TODO Do I need to check if we pass not a string here?
StringValidator.prototype.contains = function (value) {
  this.validators.push(contains(value));
  return this;
};

StringValidator.prototype.minLength = function (value) {
  this.validators.push(minLength(value));
  return this;
};

function isString(value) {
  return typeof value == "string" || value == null;
}

function isRequired(value) {
  return value != null && value != "";
}

function contains(param) {
  return function (value) {
    return value?.includes(param);
  };
}

function minLength(length) {
  return function (value) {
    return value?.length >= length;
  };
}

export default StringValidator;
