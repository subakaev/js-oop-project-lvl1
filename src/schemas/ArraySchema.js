import BaseSchema from './BaseSchema';

function ArraySchema(validators) {
  BaseSchema.call(this, 'array', validators);
}

ArraySchema.prototype = Object.create(BaseSchema.prototype);
ArraySchema.prototype.constructor = ArraySchema;

ArraySchema.prototype.required = function addRequiredCheck() {
  this.addCheck('required');
  return this;
};

ArraySchema.prototype.sizeof = function addSizeofCheck(size) {
  this.addCheck('sizeof', size);
  return this;
};

export default ArraySchema;
