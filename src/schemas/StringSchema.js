import BaseSchema from './BaseSchema';

function StringSchema(validators) {
  BaseSchema.call(this, 'string', validators);
}

StringSchema.prototype = Object.create(BaseSchema.prototype);
StringSchema.prototype.constructor = StringSchema;

StringSchema.prototype.required = function addRequiredCheck() {
  this.addCheck('required');
  return this;
};

StringSchema.prototype.contains = function addContainsCheck(str) {
  this.addCheck('contains', str);
  return this;
};

StringSchema.prototype.minLength = function addMinLengthCheck(length) {
  this.addCheck('minLength', length);
  return this;
};

export default StringSchema;
