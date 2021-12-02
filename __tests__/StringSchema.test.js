import { beforeEach } from '@jest/globals';
import Validator from '../index.js';

describe('StringSchema tests', () => {
  let validator;
  let schema;

  beforeEach(() => {
    validator = new Validator();
    schema = validator.string();
  });

  test.each([
    [undefined, true],
    [null, true],
    ['', true],
    [0, false],
    [true, false],
    ['word', true],
    ['This is a sentence', true],
  ])('Default schema for %j should return %s', (value, expected) => {
    expect(schema.isValid(value)).toBe(expected);
  });

  test.each([
    ['', false],
    ['a', true],
  ])('Required schema for %j should return %s', (value, expectedResult) => {
    schema.required();

    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    ['wor', false],
    ['word', true],
    ['A sentence with many repetitive words words', true],
  ])('Contains should for %j should return %s', (value, expectedResult) => {
    schema.contains('word');

    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test.each([
    ['wor', false],
    ['word', true],
    ['long string', true],
  ])('MinLength for %j should return %s', (value, expectedResult) => {
    schema.minLength(4);

    expect(schema.isValid(value)).toBe(expectedResult);
  });

  test('Custom validator test', () => {
    const validate = (value, start) => value.startsWith(start);
    validator.addValidator('string', 'startWith', validate);

    schema.test('startWith', 'H');

    expect(schema.isValid('exlet')).toBeFalsy();
    expect(schema.isValid('Hexlet')).toBeTruthy();
  });
});
