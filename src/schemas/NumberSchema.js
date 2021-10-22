import _ from 'lodash';
import BaseSchema from './BaseSchema';

function NumberSchema(validators) {
  BaseSchema.call(this, validators, [validators.number]);
}

NumberSchema.prototype = Object.create(BaseSchema.prototype);
NumberSchema.prototype.constructor = NumberSchema;

// TODO temporary solution - REMOVE
NumberSchema.prototype.isValid = function isValid(value) {
  if (!this.checks.includes(this.validators.required) && _.isUndefined(value)) {
    return true;
  }
  // TODO required check first
  return this.checks.every((validate) => validate(value));
};

NumberSchema.prototype.required = function addRequiredCheck() {
  this.addCheck(this.validators.required);
  return this;
};

NumberSchema.prototype.positive = function addPositiveChech() {
  this.addCheck(this.validators.positive);
  return this;
};

NumberSchema.prototype.range = function addRangeCheck(min, max) {
  this.addCheck(this.validators.range(min, max));
  return this;
};

export default NumberSchema;
