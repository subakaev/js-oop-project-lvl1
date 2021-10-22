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

  test.each([
    [undefined, true],
    [null, true],
    [0, false],
    [true, false],
    ['string', false],
    [{}, false],
    [[], false],
    [{ name: '', age: 21 }, false],
    [{ age: 21 }, false],
    [{ name: 'test', age: -21 }, false],
    [{ name: 'test' }, true],
    [{ name: 'test', age: 21 }, true],
  ])('Should for %j return %s', (value, expectedResult) => {
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  // TODO add custom validators tests
});
