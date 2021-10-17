function ArraySchema() {
  this.validators = [];
}

ArraySchema.prototype.required = function addRequiredCheck() {
  return this;
};

// TODO remove
// eslint-disable-next-line no-unused-vars
ArraySchema.prototype.sizeof = function addSizeofCheck(size) {
  return this;
};

// TODO remove
// eslint-disable-next-line no-unused-vars
ArraySchema.prototype.isValid = function isValid(value) {
  return false;
};

export default ArraySchema;
