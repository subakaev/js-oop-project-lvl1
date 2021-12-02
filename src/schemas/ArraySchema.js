import BaseSchema from './BaseSchema';

export default class ArraySchema extends BaseSchema {
  constructor(validators) {
    super('array', validators);
  }

  required() {
    this.addCheck('required');
    return this;
  }

  sizeof(size) {
    this.addCheck('sizeof', size);
    return this;
  }
}
