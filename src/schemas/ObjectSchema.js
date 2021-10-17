function ObjectSchema() {}

// TODO remove
// eslint-disable-next-line no-unused-vars
ObjectSchema.prototype.shape = function addShapeChecks(shapeSchema) {
  return this;
};

// TODO remove
// eslint-disable-next-line no-unused-vars
ObjectSchema.prototype.isValid = function isValid(value) {
  return false;
};

export default ObjectSchema;
