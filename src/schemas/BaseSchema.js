function BaseSchema(validators, checks) {
  if (this.constructor === BaseSchema) {
    throw new Error(
      `Can't instantiate abstract ${this.constructor.name} class`,
    );
  }

  // TODO rename to checks? because main class name is Validator to remove semantic inconsistences?
  this.validators = validators;
  this.checks = checks;
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
  console.log(this.checks, validatorName);
  const validate = this.validators[validatorName];
  this.checks.push((value) => validate(value, ...args));
  return this;
};

export default BaseSchema;
