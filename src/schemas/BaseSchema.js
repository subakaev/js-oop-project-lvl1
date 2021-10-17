function BaseSchema(validators, customValidators) {
  if (this.constructor === BaseSchema) {
    throw new Error(
      `Can't instantiate abstract ${this.constructor.name} class`,
    );
  }

  this.validators = validators;
  this.customValidators = customValidators;
}

BaseSchema.prototype.isValid = function isValid(value) {
  // TODO required check first
  return this.validators.every((validate) => validate(value));
};

// TODO rename validatorName -> checkName?
BaseSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  const validate = this.customValidators[validatorName];
  this.validators.push((value) => validate(value, ...args));
  return this;
};

export default BaseSchema;
