import Validator from "..";

test("isValid should return correct result", () => {
  const validator = new Validator();

  const schema = validator.string();

  expect(schema.isValid()).toBeTruthy();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid("")).toBeFalsy();
  expect(schema.isValid(0)).toBeFalsy();
  expect(schema.isValid("word")).toBeTruthy();
  expect(schema.isValid("this is a sentence")).toBeTruthy();
});

test("required should return correct result", () => {
  const validator = new Validator();

  const schema = validator.string().required();

  expect(schema.isValid()).toBeFalsy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid("")).toBeFalsy();
  expect(schema.isValid("word")).toBeTruthy();
});

test("contains should return correct result", () => {
  const validator = new Validator();

  const schema = validator.string().contains("word");

  expect(schema.isValid()).toBeFalsy();
  expect(schema.isValid("wor")).toBeFalsy();
  expect(schema.isValid("word")).toBeTruthy();
  expect(schema.isValid("words")).toBeTruthy();
  expect(schema.isValid("A sentence from words")).toBeTruthy();
});
