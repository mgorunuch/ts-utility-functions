import {isObj, isObjEmpty, objKeys} from "./object";
import {isStr, isStrEmpty} from "./string";
import {arrRefFilter, arrRefMap, isArr, isArrEmpty} from "./arr";

export function optDeref<Val>(inp: Val, isDereference: boolean): Val {
  if (inp === null || inp === undefined) { return inp }

  if (isStr(inp)) return inp
  if (isArr(inp)) return (isDereference ? [...inp] : inp) as unknown as Val
  if (isObj(inp)) return (isDereference ? {...inp} : inp) as unknown as Val

  return inp
}

export function isAnyEmpty<Val>(inp: Val): boolean {
  if (inp === null || inp === undefined) { return true }

  if (isStr(inp)) return isStrEmpty(inp)
  if (isArr(inp)) return isArrEmpty(inp)
  if (isObj(inp)) return isObjEmpty(inp)

  return false
}

// TODO: Remove "as"
// Return dereferenced object
export function anyClean<Val, ResObj>(inp: Val, {
  isDeref = false,
  isObjectKeyIgnored
}: { isDeref: boolean, isObjectKeyIgnored?: (v: string) => boolean }): ResObj | undefined {
  if (inp === null || inp === undefined) { return; }

  if (isStr(inp)) return isStrEmpty(inp) ? undefined : inp as ResObj
  if (isArr(inp)) {
    let res = optDeref(inp, isDeref)
    arrRefMap(res, (val) => anyClean(val, {isDeref}))
    arrRefFilter(res, isAnyEmpty)
    return isArrEmpty(res) ? undefined : res as unknown as ResObj
  }

  if (isObj(inp)) {
    let res = optDeref(inp, isDeref)
    objKeys(res).forEach((key) => {
      // @ts-expect-error
      res[key] = anyClean(res[key], {isDeref})
    })
    objKeys(res).forEach((key) => {
      if (isAnyEmpty(res[key])) { delete res[key] }
    })
    return isObjEmpty(res) ? undefined : res as unknown as ResObj
  }

  return inp
}

export function isSafe<Val>(val: Val | null | undefined): val is Val {
  return val !== null && val !== undefined
}

export function isSafeIs<Val, Res extends Val>(val: Val | null | undefined, isCheck: (val: Val) => val is Res): val is Val {
  return isSafe(val) && isCheck(val)
}
