import BaseSchema from './BaseSchema';

function StringSchema(validators) {
  BaseSchema.call(this, validators, [validators.string]);
}

StringSchema.prototype = Object.create(BaseSchema.prototype);
StringSchema.prototype.constructor = StringSchema;

StringSchema.prototype.required = function addRequiredCheck() {
  this.addCheck(this.validators.required);
  return this;
};

StringSchema.prototype.contains = function addContainsCheck(str) {
  this.addCheck(this.validators.contains(str));
  return this;
};

StringSchema.prototype.minLength = function addMinLengthCheck(length) {
  this.addCheck(this.validators.minLength(length));
  return this;
};

export default StringSchema;
