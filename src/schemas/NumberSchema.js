import BaseSchema from './BaseSchema';

export default class NumberSchema extends BaseSchema {
  constructor(validators) {
    super('number', validators);
  }

  required() {
    this.addCheck('required');
    return this;
  }

  positive() {
    this.addCheck('positive');
    return this;
  }

  range(min, max) {
    this.addCheck('range', min, max);
    return this;
  }
}
