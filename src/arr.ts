export const arr = {
  is: <ArrType, Other>(inp: ArrType[] | Other): inp is ArrType[] => {
    return Array.isArray(inp)
  },
  isNot: <ArrType, Other>(inp: ArrType[] | Other): inp is Other => {
    return !arr.is(inp)
  },

  isEmpty: <ArrType>(inp: ArrType[]): inp is [] => { return inp.length === 0 },
  isNotEmpty: <ArrType>(inp: ArrType[]): inp is ArrType[] => { return !arr.isEmpty(inp) },

  req: <ArrType, Other>(inp: ArrType[] | Other): ArrType[] => {
    if (!arr.is(inp)) throw new Error(`Expected an array but got ${inp}`)
    return inp
  },

  // Filter array without dereferencing
  filterRef: <ArrType>(inp: ArrType[], filter: (val: ArrType) => boolean): ArrType[] => {
    const deleted = [] as ArrType[];
    for (let i = 0; i < inp.length; i++) {
      if (!filter(inp[i])) {
        deleted.push(...inp.splice(i, 1));
        i--
      }
    }
    return inp
  },
  // TODO: Peace of shit types... Fix it
  mapRef: <ArrType, ResType>(inp: ArrType[], mapper: (val: ArrType) => ResType): ResType[] => {
    const inp2 = inp as unknown as ResType[]
    for (let i = 0; i < inp.length; i++) {
      inp2[i] = mapper(inp[i] as unknown as ArrType)
    }
    return inp as unknown as ResType[]
  },
  // TODO: Peace of shit typing... Fix it
  mapFilterRef: <ArrType, ResType>(inp: ArrType[], mapper: (val: ArrType) => ResType, filter: (val: ResType) => boolean): ResType[] => {
    arr.mapRef(inp, mapper)
    arr.filterRef(inp as unknown as ResType[], filter)
    return inp as unknown as ResType[]
  },

  isEmptySafe: <ArrType>(inp: ArrType[] | null | undefined): boolean => { return !inp || arr.isEmpty(inp) },
  isNotEmptySafe: <ArrType>(inp: ArrType[] | null | undefined): inp is ArrType[] => { return !arr.isEmptySafe(inp) },
}
