import { parser } from 'ts-parsers'

export const strIs = parser.str.is;
export const strIsEmpty = <Type extends string>(inp: Type): boolean => inp.trim() === '';
export const isStrNotEmpty = <Type extends string>(inp: Type): boolean => !strIsEmpty(inp);
export const isStrStartsWith = (prefix: string) => (inp: string): boolean => inp.startsWith(prefix);

export const strClean = <Type extends string>(inp: Type | undefined): Type | undefined => !!inp ? inp.trim() as Type : undefined;
