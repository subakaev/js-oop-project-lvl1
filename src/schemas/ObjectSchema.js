import _ from 'lodash';

function ObjectSchema() {
  this.shapeSchema = {};
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

export default ObjectSchema;
