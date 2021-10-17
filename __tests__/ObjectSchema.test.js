import { beforeEach, describe } from '@jest/globals';
import Validator from '..';

describe('ObjectSchema tests', () => {
  let schema;

  beforeEach(() => {
    const validator = new Validator();

    schema = validator.object().shape({
      name: validator.string().required(),
      age: validator.number().positive(),
    });
  });

  test('Schema should work', () => {
    expect(schema.isValid({})).toBeFalsy();
    expect(schema.isValid(0)).toBeFalsy();
    expect(schema.isValid([])).toBeFalsy();
    expect(schema.isValid(true)).toBeFalsy();
    expect(schema.isValid('string')).toBeFalsy();

    expect(schema.isValid({ name: '', age: 21 })).toBeFalsy();
    expect(schema.isValid({ age: 21 })).toBeFalsy();
    expect(schema.isValid({ name: 'test', age: 21 })).toBeTruthy();
    expect(schema.isValid({ name: 'test', age: -21 })).toBeFalsy();
    expect(schema.isValid({ name: 'test' })).toBeTruthy();
  });

  // TODO add custom validators tests
});
