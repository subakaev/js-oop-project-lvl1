import _ from 'lodash';

const validators = {
  array: (value) => _.isUndefined(value) || Array.isArray(value),
  required: Array.isArray,
  sizeof: (size) => (value) => value.length === size,
};

function ArraySchema() {
  this.validators = [validators.array];
}

ArraySchema.prototype.required = function addRequiredCheck() {
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

export default ArraySchema;
