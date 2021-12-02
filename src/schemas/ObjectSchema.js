import BaseSchema from './BaseSchema';

export default class ObjectSchema extends BaseSchema {
  constructor(validators) {
    super('object', validators);
  }

  shape(schema) {
    this.addCheck('shape', schema);
    return this;
  }
}
