# ts-utility-functions
Utility functions for TypeScript

## Installation
```bash
npm install ts-utility-functions
```

## Usage

### String
```typescript
import { str } from 'ts-utility-functions';

// str.is
str.is('')          // true
str.is(123)         // false
vals.filter(str.is) // filter out non-string values

// str.isStartWith
str.isStartWith('abc')('a')       // true
str.isStartWith('abc')('b')       // false
vals.filter(str.isStartWith('a')) // filter out values that do not start with 'a'
```


### Types
```typescript
import { assert } from 'ts-utility-functions';

// assert.type
type Currency = 'USD' | 'EUR';
const currency: Currency = 'USD';

switch (currency) {
  case 'USD':
    break;
  case 'EUR':
    break;
  default:
    assert.type<never>(currency); // compilation - ok, runtime - ok
    assert.never(currency);       // compilation - ok, runtime - ok
}

switch (currency) {
  case 'USD':
    break;
  default:
    assert.type<never>(currency); // compilation - error, runtime - ok
    assert.never(currency);       // compilation - error, runtime - ok
}

```


### Object

Example:
```ts

// obj.copyIntersectingFields
const a = { a: 1, b: 2, c: 3 }
const b = { a: 0, b: 0 }
copyIntersectingFields(a, b, ['a', 'b'])
console.log(b) // { a: 1, b: 2 }

// obj.copyIntersectingFields.toNew
const a = { a: 1, b: 2, c: 3 }
class B {
  constructor(public a: number, public b: number) {}
}
const b = copyIntersectingFields.toNew(a, B, ['a', 'b'])
console.log(b) // A { a: 1, b: 2 }


// obj.merge
const a = { a: 1, b: 2 }
const b = { b: 3, c: 4 }
const c = { c: 5, d: 6 }
const d = merge(a, b, c)
console.log(d) // { a: 1, b: 3, c: 5, d: 6 }
```
