import _ from 'lodash';
import BaseSchema from './BaseSchema';

const validators = {
  number: (value) => _.isUndefined(value) || _.isNumber(value),
  required: (value) => _.isNumber(value),
  positive: (value) => value > 0,
  range: (min, max) => (value) => value >= min && value <= max, // TODO check range corectness?
};

function NumberSchema(customValidators) {
  BaseSchema.call(this, [validators.number], customValidators);
}

NumberSchema.prototype = Object.create(BaseSchema.prototype);
NumberSchema.prototype.constructor = NumberSchema;

NumberSchema.prototype.required = function addRequiredCheck() {
  this.validators.push(validators.required);
  return this;
};

NumberSchema.prototype.positive = function addPositiveChech() {
  this.validators.push(validators.positive);
  return this;
};

NumberSchema.prototype.range = function addRangeCheck(min, max) {
  this.validators.push(validators.range(min, max));
  return this;
};

export default NumberSchema;
