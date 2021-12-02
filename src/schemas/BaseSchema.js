import _ from 'lodash';

export default class BaseSchema {
  constructor(schemaName, validators) {
    if (new.target === BaseSchema) {
      throw new TypeError(`Can't instantiate abstract ${new.target.name} class`);
    }

    this.schemaName = schemaName;
    this.validators = validators;
    this.checks = [validators[schemaName]];
    this.requiredCheckActive = false;
  }

  addCheck(validatorName, ...args) {
    if (!_.has(this.validators, validatorName)) {
      throw new Error(`Validator '${validatorName}' is not exist for schema '${this.schemaName}'`);
    }

    if (validatorName === 'required') {
      this.requiredCheckActive = true;
    }

    const validate = this.validators[validatorName];

    this.checks.push((value) => validate(value, ...args));
  }

  isValid(value) {
    if (!this.requiredCheckActive && !this.validators.required(value)) {
      return true;
    }

    return this.checks.every((validate) => validate(value));
  }

  test(validatorName, ...args) {
    this.addCheck(validatorName, ...args);
    return this;
  }
}
