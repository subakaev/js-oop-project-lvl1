import ArraySchema from './schemas/ArraySchema';
import NumberSchema from './schemas/NumberSchema';
import ObjectSchema from './schemas/ObjectSchema';
import StringSchema from './schemas/StringSchema';

function Validator() {
  this.customValidators = {
    string: {},
    number: {},
    array: {},
    object: {},
  };
}

Validator.prototype.string = function getStringSchema() {
  return new StringSchema(this.customValidators.string);
};

Validator.prototype.number = function getNumberSchema() {
  return new NumberSchema(this.customValidators.number);
};

Validator.prototype.array = function getArraySchema() {
  return new ArraySchema(this.customValidators.array);
};

Validator.prototype.object = function getObjectSchema() {
  return new ObjectSchema(this.customValidators.object);
};

Validator.prototype.addValidator = function addValidator(
  schemaName,
  validatorName,
  validate,
) {
  // TODO check schema before add?
  this.customValidators[schemaName][validatorName] = validate;
};

export default Validator;
