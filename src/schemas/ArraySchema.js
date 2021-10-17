import _ from 'lodash';

const validators = {
  array: (value) => _.isUndefined(value) || Array.isArray(value),
  required: Array.isArray,
  sizeof: (size) => (value) => value.length === size,
};

function ArraySchema(customValidators) {
  this.validators = [validators.array];
  this.customValidators = customValidators;
}

ArraySchema.prototype.required = function addRequiredCheck() {
  // TODO required check first
  this.validators.push(validators.required);
  return this;
};

ArraySchema.prototype.sizeof = function addSizeofCheck(size) {
  this.validators.push(validators.sizeof(size));
  return this;
};

ArraySchema.prototype.isValid = function isValid(value) {
  return this.validators.every((validate) => validate(value));
};

// TODO rename validatorName -> checkName?
ArraySchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  const validate = this.customValidators[validatorName];
  this.validators.push((value) => validate(value, ...args));
  return this;
};

export default ArraySchema;
