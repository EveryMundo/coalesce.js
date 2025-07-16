# @everymundo/coalesce

[![NPM Version](https://img.shields.io/npm/v/@everymundo/coalesce.svg)](https://www.npmjs.com/package/@everymundo/coalesce)
[![License](https://img.shields.io/npm/l/@everymundo/coalesce.svg)](https://github.com/EveryMundo/coalesce.js/blob/main/LICENSE)

A simple utility function that returns the first non-falsy value from a list of arguments, inspired by the SQL COALESCE function.

## Installation

```bash
npm install @everymundo/coalesce
```

## Basic Usage

```javascript
const { coalesce } = require('@everymundo/coalesce');

// Returns the first non-falsy value
const result = coalesce(undefined, null, '', 'first truthy value');
console.log(result); // 'first truthy value'

// Works with any number of arguments
const backup = coalesce(null, undefined, 'fallback');
console.log(backup); // 'fallback'
```

## API

### coalesce(...args)

Returns the first non-falsy value from the provided arguments.

**Parameters:**
- `...args` - Any number of arguments of any type

**Returns:**
- The first truthy value found, or the last value if all are falsy

**Throws:**
- `TypeError` if called with no arguments

## Examples

### Working with Different Data Types

```javascript
const { coalesce } = require('@everymundo/coalesce');

// Numbers
console.log(coalesce(0, 42)); // 42 (0 is falsy)
console.log(coalesce(null, 3.14)); // 3.14

// Strings
console.log(coalesce('', 'hello')); // 'hello' (empty string is falsy)
console.log(coalesce(null, 'world')); // 'world'

// Booleans
console.log(coalesce(false, true)); // true
console.log(coalesce(null, false)); // false (false is returned as last value)

// Objects and Arrays
console.log(coalesce(null, { name: 'John' })); // { name: 'John' }
console.log(coalesce(undefined, [1, 2, 3])); // [1, 2, 3]
console.log(coalesce(null, [])); // [] (empty array is truthy)

// Functions
const myFunction = () => 'hello';
console.log(coalesce(null, myFunction)); // [Function: myFunction]
```

### Practical Use Cases

```javascript
const { coalesce } = require('@everymundo/coalesce');

// Configuration with fallbacks
const config = {
  port: coalesce(process.env.PORT, process.env.DEFAULT_PORT, 3000),
  host: coalesce(process.env.HOST, 'localhost'),
  debug: coalesce(process.env.DEBUG, false)
};

// User data with defaults
function createUser(userData) {
  return {
    name: coalesce(userData.name, userData.displayName, 'Anonymous'),
    email: coalesce(userData.email, userData.contactEmail, ''),
    role: coalesce(userData.role, 'user')
  };
}

// API response handling
function processApiResponse(response) {
  const data = coalesce(response.data, response.result, {});
  const message = coalesce(response.message, response.error, 'No message');
  return { data, message };
}
```

## Falsy Values in JavaScript

The `coalesce` function considers the following values as falsy:
- `false`
- `0` (zero)
- `-0` (negative zero)
- `0n` (BigInt zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

All other values are considered truthy, including:
- `[]` (empty array)
- `{}` (empty object)
- `function() {}` (functions)
- `"0"` (string containing zero)
- `"false"` (string containing "false")

## Edge Cases

```javascript
const { coalesce } = require('@everymundo/coalesce');

// Single argument
console.log(coalesce('only value')); // 'only value'
console.log(coalesce(null)); // null

// All falsy values - returns the last one
console.log(coalesce(null, undefined, false, 0, '')); // '' (empty string)

// No arguments will throw an error
try {
  coalesce(); // TypeError: Reduce of empty array with no initial value
} catch (error) {
  console.error('Error:', error.message);
}
```

## Comparison with SQL COALESCE

This function behaves similarly to the SQL COALESCE function:

```sql
-- SQL
SELECT COALESCE(NULL, NULL, 'first non-null', 'second') AS result;
-- Returns: 'first non-null'
```

```javascript
// JavaScript equivalent
const result = coalesce(null, null, 'first non-null', 'second');
console.log(result); // 'first non-null'
```

The main difference is that JavaScript's falsy values include more than just `null` and `undefined`.

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run check-lint
```

### Coverage

```bash
npm run cover
npm run check-coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

Please make sure to update tests as appropriate and ensure all tests pass.

## License

ISC

## Repository

[https://github.com/EveryMundo/coalesce.js](https://github.com/EveryMundo/coalesce.js)
