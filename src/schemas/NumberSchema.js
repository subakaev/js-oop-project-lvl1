import BaseSchema from './BaseSchema';

function NumberSchema(validators) {
  BaseSchema.call(this, 'number', validators);
}

NumberSchema.prototype = Object.create(BaseSchema.prototype);
NumberSchema.prototype.constructor = NumberSchema;

NumberSchema.prototype.required = function addRequiredCheck() {
  this.addCheck('required');
  return this;
};

NumberSchema.prototype.positive = function addPositiveCheck() {
  this.addCheck('positive');
  return this;
};

NumberSchema.prototype.range = function addRangeCheck(min, max) {
  this.addCheck('range', min, max);
  return this;
};

export default NumberSchema;
