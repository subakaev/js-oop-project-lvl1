import _ from 'lodash';

function ObjectSchema(customValidators) {
  this.shapeSchema = {};
  this.customValidators = customValidators;
}

// TODO remove
// eslint-disable-next-line no-unused-vars
ObjectSchema.prototype.shape = function addShapeChecks(shapeSchema) {
  // TODO check shape schema type?
  this.shapeSchema = shapeSchema;
  return this;
};

// TODO remove
// eslint-disable-next-line no-unused-vars
ObjectSchema.prototype.isValid = function isValid(value) {
  if (!_.isObject(value)) {
    return false; // TODO check array?
  }

  const keys = Object.keys(this.shapeSchema);

  return keys.every((key) => this.shapeSchema[key].isValid(value[key]));
};

// TODO rename validatorName -> checkName?
ObjectSchema.prototype.test = function addCustomCheck(validatorName, ...args) {
  // TODO check validator name?
  const validate = this.customValidators[validatorName];
  this.validators.push((value) => validate(value, ...args));
  return this;
};

export default ObjectSchema;
