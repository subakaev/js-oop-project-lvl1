import NumberSchema from './schemas/NumberSchema';
import StringSchema from './schemas/StringSchema';

function Validator() {}

Validator.prototype.string = function getStringSchema() {
  return new StringSchema();
};

Validator.prototype.number = function getNumberSchema() {
  return new NumberSchema();
};

export default Validator;
