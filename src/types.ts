export function assertType<T>(value: T): void {}
export function assertNever(value: never): void {}

export const assert = {
  type: assertType,
  never: assertNever,
}


