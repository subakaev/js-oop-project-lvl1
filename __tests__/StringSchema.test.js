import { beforeEach } from '@jest/globals';
import Validator from '../index.js';

describe('StringSchema tests', () => {
  let schema;

  beforeEach(() => {
    const validator = new Validator();
    schema = validator.string();
  });

  test.each([
    [undefined, false],
    [null, false],
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

  test('custom validators test', () => {
    const validator = new Validator();

    const fn = (value, start) => value.startsWith(start);
    // Метод добавления новых валидаторов
    // addValidator(type, name, fn)
    validator.addValidator('string', 'startWith', fn);

    const customSchema = validator.string().test('startWith', 'H');

    expect(customSchema.isValid('exlet')).toBe(false);
    expect(customSchema.isValid('Hexlet')).toBe(true);
  });
});
