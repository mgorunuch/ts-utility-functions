import {objIs, objIsEmpty, objKeys} from "./object";
import {strClean, strIs, strIsEmpty} from "./string";
import {arrClean, arrRefFilter, arrRefMap, arrIs, arrIsEmpty} from "./arr";
import {optDeref} from "./types";

export function anyIsEmpty<Val>(inp: Val): boolean {
  if (inp === null || inp === undefined) { return true }

  if (strIs(inp)) return strIsEmpty(inp)
  if (arrIs(inp)) return arrIsEmpty(inp)
  if (objIs(inp)) return objIsEmpty(inp)

  return false
}

let log = false

// TODO: Remove "as"
// Return dereferenced object
export function anyClean<Val, ResObj>(inp: Val, {
  isDeref = false,
}: { isDeref: boolean, isObjectKeyIgnored?: (v: string) => boolean }): ResObj | undefined {
  if (inp === null || inp === undefined) { return; }

  if (strIs(inp)) return strClean(inp) as ResObj
  if (arrIs(inp)) return arrClean(inp, isDeref) as ResObj

  if (objIs(inp)) {
    let res = optDeref(inp, isDeref)
    objKeys(res).forEach((key) => {
      // @ts-expect-error
      res[key] = anyClean(res[key], {isDeref})

      if (anyIsEmpty(res[key])) {
        delete res[key]
      }
    })
    return objIsEmpty(res) ? undefined : res as unknown as ResObj
  }

  return inp
}

export function isSafe<Val>(val: Val | null | undefined): val is Val {
  return val !== null && val !== undefined
}

export function isSafeIs<Val, Res extends Val>(val: Val | null | undefined, isCheck: (val: Val) => val is Res): val is Val {
  return isSafe(val) && isCheck(val)
}
