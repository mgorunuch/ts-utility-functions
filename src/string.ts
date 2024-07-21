import { parser } from 'ts-parsers'

export const isStr = parser.str.is;
export const isStrEmpty = <Type extends string>(inp: Type): boolean => inp.trim() === '';
export const isStrNotEmpty = <Type extends string>(inp: Type): boolean => !isStrEmpty(inp);
export const isStrStartsWith = (prefix: string) => (inp: string): boolean => inp.startsWith(prefix);

export const str = {
  is: isStr,
  isEmpty: isStrEmpty,
  isNotEmpty: isStrNotEmpty,
  startsWith: isStrStartsWith,
}
