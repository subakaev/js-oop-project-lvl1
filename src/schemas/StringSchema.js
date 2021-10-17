import _ from 'lodash';

const validators = {
  string: _.isString,
  required: (value) => value !== '',
  contains: (str) => (value) => value.includes(str),
  minLength: (length) => (value) => value.length >= length,
};

function StringSchema(customValidators) {
  this.validators = [validators.string];
  this.customValidators = customValidators;
}

StringSchema.prototype.isValid = function isValid(value) {
  // TODO required check first
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

// TODO rename validatorName -> checkName?
StringSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  const validate = this.customValidators[validatorName];
  this.validators.push((value) => validate(value, ...args));
  return this;
};

export default StringSchema;
