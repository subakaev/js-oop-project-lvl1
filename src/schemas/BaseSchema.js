import _ from 'lodash';

function BaseSchema(schemaName, validators) {
  if (this.constructor === BaseSchema) {
    throw new Error(
      `Can't instantiate abstract ${this.constructor.name} class`,
    );
  }

  this.schemaName = schemaName;
  this.validators = validators;
  this.checks = [validators[schemaName]];
  this.requiredCheckActive = false;
}

BaseSchema.prototype.addCheck = function addCheck(validatorName, ...args) {
  if (!_.has(this.validators, validatorName)) {
    throw new Error(
      `Validator '${validatorName}' is not exist for schema '${this.schemaName}'`,
    );
  }

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

  return this.checks.every((validate) => validate(value));
};

BaseSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  this.addCheck(validatorName, ...args);
  return this;
};

export default BaseSchema;
