import BaseSchema from './BaseSchema';

function ArraySchema(validators) {
  BaseSchema.call(this, validators, [validators.array]);
}

ArraySchema.prototype = Object.create(BaseSchema.prototype);
ArraySchema.prototype.constructor = ArraySchema;

ArraySchema.prototype.required = function addRequiredCheck() {
  // TODO required check first
  this.addCheck(this.validators.required);
  return this;
};

ArraySchema.prototype.sizeof = function addSizeofCheck(size) {
  this.addCheck(this.validators.sizeof(size));
  return this;
};

export default ArraySchema;
