import { beforeEach, describe } from '@jest/globals';
import Validator from '..';

describe('NumberSchema tests', () => {
  let schema;

  beforeEach(() => {
    const validator = new Validator();

    schema = validator.number();
  });

  test.each([
    [undefined, true],
    [null, true],
    ['', false],
    ['1', false],
    [0, true],
    [true, false],
    [{}, false],
  ])('Default schema for %j should return %s', (value, expectedResult) => {
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    [undefined, false],
    [null, false],
    ['', false],
    ['1', false],
    [0, true],
    [true, false],
    [{}, false],
  ])('Required schema for %j should return %s', (value, expectedResult) => {
    schema.required();
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    [-1, false],
    [0, false],
    [1, true],
    [123, true],
  ])('Positive schema for %j should return %s', (value, expectedResult) => {
    schema.positive();
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    [-66, false],
    [-6, false],
    [-5, true],
    [0, true],
    [5, true],
    [6, false],
    [123, false],
  ])('Range schema for %j should return %s', (value, expectedResult) => {
    schema.range(-5, 5);
    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test('custom validators tests', () => {
    const v = new Validator();
    const fn = (value, min) => value >= min;
    v.addValidator('number', 'min', fn);

    const customSchema = v.number().test('min', 5);
    expect(customSchema.isValid(4)).toBe(false); // false
    expect(customSchema.isValid(6)).toBe(true); // true
  });
});
