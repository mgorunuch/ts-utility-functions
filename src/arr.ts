import {optDeref} from "./types";
import {anyClean, anyIsEmpty} from "./any";
import {boolFuncSwap1} from "./bool";

export function arrIs<ArrType, Other>(inp: ArrType[] | Other): inp is ArrType[] {
  return Array.isArray(inp)
}

export function reqIsArr<ArrType, Other>(inp: ArrType[] | Other): asserts inp is ArrType[] {
  if (!arrIs(inp)) throw new Error(`Expected an array but got ${inp}`)
}
export function reqArr<ArrType, Other>(inp: ArrType[] | Other): ArrType[] {
  reqIsArr(inp)
  return inp
}

export function isNotArr<ArrType>(inp: ArrType[]): inp is ArrType[] {
  return !arrIs(inp)
}

export function arrIsEmpty<ArrType>(inp: ArrType[]): inp is [] {
  return inp.length === 0
}

export function isArrNotEmpty<ArrType>(inp: ArrType[]): inp is ArrType[] {
  return !arrIsEmpty(inp)
}

// Array filter by reference
export function arrRefFilter<ArrType>(inp: ArrType[], filter: (val: ArrType) => boolean): ArrType[] {
  for (let i = 0; i < inp.length; i++) {
    if (!filter(inp[i])) {
      inp.splice(i, 1)
      i--
    }
  }
  return inp
}

// Array map by reference
export function arrRefMap<ArrType, ResType>(inp: ArrType[], mapper: (val: ArrType) => ResType): ResType[] {
  const inp2 = inp as unknown as ResType[]
  for (let i = 0; i < inp.length; i++) {
    inp2[i] = mapper(inp[i] as unknown as ArrType)
  }
  return inp2 as unknown as ResType[]
}

export function arrClean<ResType>(arr: any[], isDeref = false): ResType[] | undefined {
  const res = optDeref(arr, isDeref)
  arrRefMap(res, (val) => {
    return anyClean(val, {isDeref})
  })
  arrRefFilter(res, boolFuncSwap1(anyIsEmpty))
  return arrIsEmpty(res) ? undefined : res as unknown as ResType[]
}
