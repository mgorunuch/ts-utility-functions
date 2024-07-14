# ts-utility-functions
Utility functions for TypeScript

## Installation
```bash
npm install ts-utility-functions
```

## Usage

### String

#### `str.is`
```typescript
str.is('')          // true
str.is(123)         // false
vals.filter(str.is) // filter out non-string values
```

#### `str.isStartWith`
```typescript
str.isStartWith('abc')('a')       // true
str.isStartWith('abc')('b')       // false
vals.filter(str.isStartWith('a')) // filter out values that do not start with 'a'
```


### Types

#### `assert.type`, `assert.never`
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

#### `obj.copyIntersectingFields`
```typescript
const a = { a: 1, b: 2, c: 3 }
const b = { a: 0, b: 0 }
copyIntersectingFields(a, b, ['a', 'b'])
console.log(b) // { a: 1, b: 2 }
```

#### `obj.copyIntersectingFields.toNew`
```typescript
const a = { a: 1, b: 2, c: 3 }
class B {
  constructor(public a: number, public b: number) {}
}
const b = copyIntersectingFields.toNew(a, B, ['a', 'b'])
console.log(b) // A { a: 1, b: 2 }
```

#### `obj.merge`
```typescript
const a = { a: 1, b: 2 }
const b = { b: 3, c: 4 }
const c = { c: 5, d: 6 }
const d = merge(a, b, c)
console.log(d) // { a: 1, b: 3, c: 5, d: 6 }
```

#### `obj.vals`
```typescript
const a = { a: 1, b: 2, c: '3' }
const b = vals(a)
console.log(b) // [1, 2, '3'] as (string | number)[]

const a = { a: 1, b: 2, c: '3' } as const
const b = vals(a)
console.log(b) // [1, 2, '3'] as (1 | 2 | '3')[]
```

#### `obj.keys`
```typescript
const a = { a: 1, b: 2, c: 3 }
const b = keys(a)
console.log(b) // ['a', 'b', 'c'] as ('a', 'b', 'c')[]
```

### Function

### `fn.noop`
```typescript
const a = fn.noop() // does nothing (returns undefined)
```

### `fn.noopAsync`
```typescript
const a = await fn.noopAsync() // does nothing (returns Promise<undefined>)
```

### Array

### `arr.is`
```typescript
arr.is([])          // true
arr.is([1, 2, 3])   // true
vals.filter(arr.is) // filter out non-array values
```

### `arr.isNot`
```typescript   
arr.isNot([])          // false
arr.isNot([1, 2, 3])   // false
vals.filter(arr.isNot) // filter out array values
```

### `arr.req`
```typescript   
arr.req([])          // []
arr.req([1, 2, 3])   // [1, 2, 3]
arr.req(null)        // throws error
```

### `arr.isEmpty`
```typescript
arr.isEmpty([])          // true
arr.isEmpty([1, 2, 3])   // false
vals.filter(arr.isEmpty) // filter out non-empty arrays
```

### `arr.isNotEmpty`
```typescript
arr.isNotEmpty([])          // false
arr.isNotEmpty([1, 2, 3])   // true
vals.filter(arr.isNotEmpty) // filter out empty arrays
```
