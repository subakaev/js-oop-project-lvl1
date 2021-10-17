import _ from 'lodash';

const validators = {
  number: (value) => _.isUndefined(value) || _.isNumber(value),
  required: (value) => _.isNumber(value),
  positive: (value) => value > 0,
  range: (min, max) => (value) => value >= min && value <= max, // TODO check range corectness?
};

function NumberSchema() {
  this.validators = [validators.number];
}

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

NumberSchema.prototype.isValid = function isValid(value) {
  // TODO refactor this as well as for all other schemas
  if (!this.validators.includes(validators.required) && _.isUndefined(value)) {
    return true;
  }

  return this.validators.every((validate) => validate(value));
};

export default NumberSchema;
