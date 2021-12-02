import { beforeEach, describe } from '@jest/globals';
import Validator from '..';

describe('ArraySchema tests', () => {
  let validator;
  let schema;

  beforeEach(() => {
    validator = new Validator();

    schema = validator.array();
  });

  test.each([
    [undefined, true],
    [null, false],
    ['', false],
    [1, false],
    [[], true],
    [[1, 2], true],
    [{}, false],
  ])('Default schema for %j should return %s', (value, expectedResult) => {
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    [undefined, false],
    [null, false],
    ['', false],
    [1, false],
    [[], true],
    [[1, 2], true],
    [{}, false],
  ])('Required schema for %j should return %s', (value, expectedResult) => {
    schema.required();

    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    [[], false],
    [[1], false],
    [[1, 2], true],
    [[1, 2, 3], false],
  ])('Sizeof schema for %j should return %s', (value, expectedResult) => {
    schema.sizeof(2);

    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test('Custom validator test', () => {
    const validate = (value, search) => value.includes(search);
    validator.addValidator('array', 'includes', validate);

    schema.test('includes', 1);

    expect(schema.isValid([1])).toBeTruthy();
    expect(schema.isValid([2])).toBeFalsy();
    expect(schema.isValid([1, 2])).toBeTruthy();
  });
});
