import _ from 'lodash';

const validators = {
  string: _.isString,
  required: (value) => value !== '',
  contains: (str) => (value) => value.includes(str),
  minLength: (length) => (value) => value.length >= length,
};

function StringSchema() {
  this.validators = [validators.string];
}

StringSchema.prototype.isValid = function isValid(value) {
  return this.validators.every((validate) => validate(value));
};

StringSchema.prototype.required = function addRequiredCheck() {
  this.validators.push(validators.required);
  return this;
};

StringSchema.prototype.contains = function addContainsCheck(str) {
  this.validators.push(validators.contains(str));
  return this;
};

StringSchema.prototype.minLength = function addMinLengthCheck(length) {
  this.validators.push(validators.minLength(length));
  return this;
};

export default StringSchema;
