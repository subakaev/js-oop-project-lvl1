import _ from 'lodash';
import BaseSchema from './BaseSchema';

const validators = {
  string: _.isString,
  required: (value) => value !== '',
  contains: (str) => (value) => value.includes(str),
  minLength: (length) => (value) => value.length >= length,
};

function StringSchema(customValidators) {
  BaseSchema.call(this, [validators.string], customValidators);
}

StringSchema.prototype = Object.create(BaseSchema.prototype);
StringSchema.prototype.constructor = StringSchema;

StringSchema.prototype.required = function addRequiredCheck() {
  this.validators.push(validators.required);
  return this;
};

StringSchema.prototype.contains = function addContainsCheck(str) {
  this.validators.push(validators.contains(str));
  return this;
};

StringSchema.prototype.minLength = function addMinLengthCheck(length) {
  this.validators.push(validators.minLength(length));
  return this;
};

export default StringSchema;
