export function assertType<T>(_value: T): void {}
export function assertNever(_value: never): void {}

export const assert = {
  type: assertType,
  never: assertNever,
}
