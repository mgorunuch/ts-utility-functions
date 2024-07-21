
export function isArr<ArrType, Other>(inp: ArrType[] | Other): inp is ArrType[] {
  return Array.isArray(inp)
}

export function reqIsArr<ArrType, Other>(inp: ArrType[] | Other): asserts inp is ArrType[] {
  if (!isArr(inp)) throw new Error(`Expected an array but got ${inp}`)
}

export function isNotArr<ArrType>(inp: ArrType[]): inp is ArrType[] {
  return !isArr(inp)
}

export function isArrEmpty<ArrType>(inp: ArrType[]): inp is [] {
  return inp.length === 0
}

export function isArrNotEmpty<ArrType>(inp: ArrType[]): inp is ArrType[] {
  return !isArrEmpty(inp)
}

// Array filter by reference
export function arrRefFilter<ArrType>(inp: ArrType[], filter: (val: ArrType) => boolean): ArrType[] {
  const deleted = [] as ArrType[];
  for (let i = 0; i < inp.length; i++) {
    if (!filter(inp[i])) {
      deleted.push(...inp.splice(i, 1));
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
  return inp as unknown as ResType[]
}
