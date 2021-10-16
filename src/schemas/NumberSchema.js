function NumberSchema() {
  this.validators = [];
}

NumberSchema.prototype.required = function addRequiredCheck() {
  return this;
};

NumberSchema.prototype.positive = function addPositiveChech() {
  return this;
};

// TODO remove
// eslint-disable-next-line no-unused-vars
NumberSchema.prototype.range = function addRangeCheck(min, max) {
  return this;
};

export default NumberSchema;
