import _ from 'lodash';
import BaseSchema from './BaseSchema';

const validators = {
  array: (value) => _.isUndefined(value) || Array.isArray(value),
  required: Array.isArray,
  sizeof: (size) => (value) => value.length === size,
};

function ArraySchema(customValidators) {
  BaseSchema.call(this, [validators.array], customValidators);
}

ArraySchema.prototype = Object.create(BaseSchema.prototype);
ArraySchema.prototype.constructor = ArraySchema;

ArraySchema.prototype.required = function addRequiredCheck() {
  // TODO required check first
  this.addCheck(validators.required);
  return this;
};

ArraySchema.prototype.sizeof = function addSizeofCheck(size) {
  this.addCheck(validators.sizeof(size));
  return this;
};

export default ArraySchema;
