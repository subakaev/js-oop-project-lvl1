import _ from 'lodash';

import ArraySchema from './schemas/ArraySchema';
import NumberSchema from './schemas/NumberSchema';
import ObjectSchema from './schemas/ObjectSchema';
import StringSchema from './schemas/StringSchema';

const builtInValidators = {
  string: {
    string: _.isString,
    required: (value) => value !== '',
    contains: (str) => (value) => value.includes(str),
    minLength: (length) => (value) => value.length >= length,
  },
  number: {
    number: (value) => _.isUndefined(value) || _.isNumber(value),
    required: (value) => _.isNumber(value),
    positive: (value) => value > 0,
    range: (min, max) => (value) => value >= min && value <= max, // TODO check range corectness?
  },
  array: {
    array: (value) => _.isUndefined(value) || Array.isArray(value),
    required: Array.isArray,
    sizeof: (size) => (value) => value.length === size,
  },
  object: {},
};

function Validator() {
  this.validators = builtInValidators;
}

Validator.prototype.string = function getStringSchema() {
  return new StringSchema(this.validators.string);
};

Validator.prototype.number = function getNumberSchema() {
  return new NumberSchema(this.validators.number);
};

Validator.prototype.array = function getArraySchema() {
  return new ArraySchema(this.validators.array);
};

Validator.prototype.object = function getObjectSchema() {
  return new ObjectSchema(this.validators.object);
};

Validator.prototype.addValidator = function addValidator(
  schemaName,
  validatorName,
  validate,
) {
  // TODO check schema before add?
  this.validators[schemaName][validatorName] = validate;
};

export default Validator;
