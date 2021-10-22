import _ from 'lodash';

function BaseSchema(schemaName, validators) {
  if (this.constructor === BaseSchema) {
    throw new Error(
      `Can't instantiate abstract ${this.constructor.name} class`,
    );
  }

  // TODO rename to checks? because main class name is Validator to remove semantic inconsistences?
  this.validators = validators;
  this.checks = [validators[schemaName]];
  this.requiredCheckActive = false;
}

BaseSchema.prototype.addCheck = function addCheck(validatorName, ...args) {
  if (validatorName === 'required') {
    this.requiredCheckActive = true;
  }

  const validate = this.validators[validatorName];

  this.checks.push((value) => validate(value, ...args));
};

BaseSchema.prototype.isValid = function isValid(value) {
  if (!this.requiredCheckActive && _.isUndefined(value)) {
    return true;
  }

  // TODO required check first
  return this.checks.every((validate) => validate(value));
};

// TODO rename validatorName -> checkName?
BaseSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  this.addCheck(validatorName, ...args);
  return this;
};

export default BaseSchema;
