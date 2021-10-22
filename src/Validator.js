import _ from 'lodash';

import ArraySchema from './schemas/ArraySchema';
import NumberSchema from './schemas/NumberSchema';
import ObjectSchema from './schemas/ObjectSchema';
import StringSchema from './schemas/StringSchema';

const builtInValidators = {
  string: {
    string: _.isString,
    required: (value) => value !== '',
    contains: (value, str) => value.includes(str),
    minLength: (value, length) => value.length >= length,
  },
  number: {
    number: (value) => _.isUndefined(value) || _.isNumber(value),
    required: (value) => _.isNumber(value),
    positive: (value) => value > 0,
    range: (value, min, max) => value >= min && value <= max,
  },
  array: {
    array: (value) => _.isUndefined(value) || Array.isArray(value),
    required: Array.isArray,
    sizeof: (value, size) => value.length === size,
  },
  object: {
    object: _.isObject,
    shape: (value, schemaObject) => {
      const entries = Object.entries(schemaObject);

      return entries.every(([key, schema]) => schema.isValid(value[key]));
    },
  },
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
  if (!_.has(this.validators, schemaName)) {
    throw new Error(`schema ${schemaName} is not supported!`);
  }
  this.validators[schemaName][validatorName] = validate;
};

export default Validator;
