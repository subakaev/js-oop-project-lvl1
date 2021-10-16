import StringValidator from './validators/StringValidator';

function Validator() {}

Validator.prototype.string = function getStringValidator() {
  return new StringValidator();
};

export default Validator;
