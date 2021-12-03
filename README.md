### Hexlet tests and linter status:

[![Actions Status](https://github.com/subakaev/js-oop-project-lvl1/workflows/hexlet-check/badge.svg)](https://github.com/subakaev/js-oop-project-lvl1/actions)
[![.github/workflows/check.yml](https://github.com/subakaev/js-oop-project-lvl1/actions/workflows/check.yml/badge.svg)](https://github.com/subakaev/js-oop-project-lvl1/actions/workflows/check.yml)

## Validator

The library provide set of methods to validate data with ability to write your own validators. It can be used anywhere: backend, frontend - no matter.

The purpose of this project is to understand how to work with OOP in JavaScript

You can find more information [here](https://ru.hexlet.io/programs/js-oop)

## Usage

To start work with library you need to create a `validator`:

```js
const validator = new Validator();

const schema = schema.string();

schema.isValid('string'); // true
```

Every validator has `isValid` method

### String schema

Provide 3 methods to validate strings:

- `string` - creates a schema
- `required`
- `contains`

```js
const schema = validator.string();

schema.isValid(''); // true

schema.required();

schema.isValid('what does the fox say'); // true
schema.isValid('hexlet'); // true
schema.isValid(null); // false
schema.isValid(''); // false

schema.contains('what').isValid('what does the fox say'); // true
schema.contains('whatthe').isValid('what does the fox say'); // false
```

### Number schema

Provide 4 methods to validate strings:

- `number` - creates a schema
- `required`
- `positive`
- `range`

```js
const schema = validator.number();

schema.isValid(null); // true

schema.required();

schema.isValid(null); // false
schema.isValid(7); // true

schema.positive().isValid(10); // true

schema.range(-5, 5);

schema.isValid(-3); // false
schema.isValid(5); // true
```

### Array schema

Provide 3 methods to validate strings:

- `array` - creates a schema
- `required`
- `sizeof`

```js
const schema = validator.array();

schema.isValid(null); // false

const schema = schema.required();

schema.isValid([]); // true
schema.isValid(['hexlet']); // true

schema.sizeof(2);

schema.isValid(['hexlet']); // false
schema.isValid(['hexlet', 'code-basics']); // true
```

### Object schema

Provide 2 methods to validate strings:

- `object` - creates a schema
- `shape` - allows to set nested schemas for every object property

```js
const schema = validator.object();

schema.shape({
  name: validator.string().required(),
  age: validator.number().positive(),
});

schema.isValid({ name: 'kolya', age: 100 }); // true
schema.isValid({ name: 'maya', age: null }); // true
schema.isValid({ name: '', age: null }); // false
schema.isValid({ name: 'ada', age: -5 }); // false
```

### Custom validator

You can write your own validators for any schema using `addValidator` method

```js
const validator = new Validator();

const validateStartsWith = (value, start) => value.startsWith(start);
validator.addValidator('string', 'startWith', validateStartsWith);

const schema = validator.string().test('startWith', 'H');
schema.isValid('exlet'); // false
schema.isValid('Hexlet'); // true

const validateMin = (value, min) => value >= min;
validator.addValidator('number', 'min', validateMin);

const schema = validator.number().test('min', 5);
schema.isValid(4); // false
schema.isValid(6); // true
```
