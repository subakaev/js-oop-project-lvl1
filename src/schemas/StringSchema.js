import BaseSchema from './BaseSchema';

export default class StringSchema extends BaseSchema {
  constructor(validators) {
    super('string', validators);
  }

  required() {
    this.addCheck('required');
    return this;
  }

  contains(str) {
    this.addCheck('contains', str);
    return this;
  }

  minLength(length) {
    this.addCheck('minLength', length);
    return this;
  }
}
