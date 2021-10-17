import ArraySchema from './schemas/ArraySchema';
import NumberSchema from './schemas/NumberSchema';
import StringSchema from './schemas/StringSchema';

function Validator() {}

Validator.prototype.string = function getStringSchema() {
  return new StringSchema();
};

Validator.prototype.number = function getNumberSchema() {
  return new NumberSchema();
};

Validator.prototype.array = function getArraySchema() {
  return new ArraySchema();
};

export default Validator;
