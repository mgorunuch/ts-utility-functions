export function boolFuncSwap1<T>(fun: (val1: T) => boolean): (val1: T) => boolean {
  return (val1) => !fun(val1)
}
