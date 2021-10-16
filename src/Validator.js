import StringSchema from './schemas/StringSchema';

function Validator() {}

Validator.prototype.string = function getStringValidator() {
  return new StringSchema();
};

export default Validator;
