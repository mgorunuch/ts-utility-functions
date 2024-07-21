import {str} from "@/string";
import {arr} from "@/arr";
import {obj} from "@/object";

export function optDeref<Val>(inp: Val, isDereference: boolean): Val {
  if (inp === null || inp === undefined) { return inp }

  if (str.is(inp)) return inp
  if (arr.is(inp)) return (isDereference ? [...inp] : inp) as unknown as Val
  if (obj.is(inp)) return (isDereference ? {...inp} : inp) as unknown as Val

  return inp
}

export function isAnyEmpty<Val>(inp: Val): boolean {
  if (inp === null || inp === undefined) { return true }

  if (str.is(inp)) return str.isEmpty(inp)
  if (arr.is(inp)) return arr.isEmpty(inp)
  if (obj.is(inp)) return obj.isEmpty(inp)

  return false
}

// TODO: Remove "as"
// Return dereferenced object
export function anyClean<Val, ResObj>(inp: Val, isDeref: boolean = false): ResObj | undefined {
  if (inp === null || inp === undefined) { return; }

  if (str.is(inp)) return str.isEmpty(inp) ? undefined : inp as ResObj
  if (arr.is(inp)) {
    let res = optDeref(inp, isDeref)
    arr.mapRef(res, (val) => anyClean(val, isDeref))
    arr.filterRef(res, isAnyEmpty)
    return arr.isEmpty(res) ? undefined : res as unknown as ResObj
  }

  if (obj.is(inp)) {
    let res = optDeref(inp, isDeref)
    obj.keys(res).forEach((key) => {
      // @ts-expect-error
      res[key] = anyClean(res[key], isDeref)
    })
    obj.keys(res).forEach((key) => {
      if (isAnyEmpty(res[key])) { delete res[key] }
    })
    return obj.isEmpty(res) ? undefined : res as unknown as ResObj
  }

  return inp
}
