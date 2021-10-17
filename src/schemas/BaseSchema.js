function BaseSchema(checks, customValidators) {
  if (this.constructor === BaseSchema) {
    throw new Error(
      `Can't instantiate abstract ${this.constructor.name} class`,
    );
  }

  // TODO rename to checks? because main class name is Validator to remove semantic inconsistences?
  this.checks = checks;
  this.customValidators = customValidators;
}

BaseSchema.prototype.addCheck = function addCheck(validate) {
  this.checks.push(validate);
};

BaseSchema.prototype.isValid = function isValid(value) {
  // TODO required check first
  return this.checks.every((validate) => validate(value));
};

// TODO rename validatorName -> checkName?
BaseSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  const validate = this.customValidators[validatorName];
  this.checks.push((value) => validate(value, ...args));
  return this;
};

export default BaseSchema;
