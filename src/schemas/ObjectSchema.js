import _ from 'lodash';
import BaseSchema from './BaseSchema';

function ObjectSchema(validators) {
  BaseSchema.call(this, validators, []); // TODO
}

ObjectSchema.prototype = Object.create(BaseSchema.prototype);
ObjectSchema.prototype.constructor = ObjectSchema;

// TODO remove
ObjectSchema.prototype.shape = function addShapeChecks(shapeSchema) {
  // TODO check shape schema type?
  this.shapeSchema = shapeSchema;
  return this;
};

// TODO remove
ObjectSchema.prototype.isValid = function isValid(value) {
  if (!_.isObject(value)) {
    return false; // TODO check array?
  }

  const keys = Object.keys(this.shapeSchema);

  return keys.every((key) => this.shapeSchema[key].isValid(value[key]));
};

export default ObjectSchema;
