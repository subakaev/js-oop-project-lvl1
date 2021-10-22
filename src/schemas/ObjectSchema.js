import BaseSchema from './BaseSchema';

function ObjectSchema(validators) {
  BaseSchema.call(this, 'object', validators);
}

ObjectSchema.prototype = Object.create(BaseSchema.prototype);
ObjectSchema.prototype.constructor = ObjectSchema;

ObjectSchema.prototype.shape = function addShapeChecks(shapeSchema) {
  this.addCheck('shape', shapeSchema);
  return this;
};

export default ObjectSchema;
