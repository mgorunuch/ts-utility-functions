export const arr = {
  is: <ArrType, Other>(inp: ArrType[] | Other): inp is ArrType[] => {
    return Array.isArray(inp)
  },
  isNot: <ArrType, Other>(inp: ArrType[] | Other): inp is Other => {
    return !arr.is(inp)
  },
  req: <ArrType, Other>(inp: ArrType[] | Other): ArrType[] => {
    if (!arr.is(inp)) throw new Error(`Expected an array but got ${inp}`)
    return inp
  },
  isEmpty: <ArrType>(inp: ArrType[]): boolean => { return inp.length === 0 },
  isNotEmpty: <ArrType>(inp: ArrType[]): boolean => { return !arr.isEmpty(inp) },

  isEmptySafe: <ArrType>(inp: ArrType[] | null | undefined): boolean => { return !inp || arr.isEmpty(inp) },
  isNotEmptySafe: <ArrType>(inp: ArrType[] | null | undefined): inp is ArrType[] => { return !arr.isEmptySafe(inp) },
}
