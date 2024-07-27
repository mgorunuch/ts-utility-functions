import {strIs} from "./string";
import {arrIs} from "./arr";
import {objIs} from "./object";

export type Constructor<T = object> = new (...args: any[]) => T

export type IntersectingFields<S, T> = {
  [K in keyof S & keyof T]: [S[K], T[K]] extends [T[K], S[K]] ? K : never;
}[keyof S & keyof T]

export interface Constructable<Cls> {
  new (): Cls
}

export function optDeref<Val>(inp: Val, isDereference: boolean): Val {
  if (inp === null || inp === undefined) { return inp }

  if (strIs(inp)) return inp
  if (arrIs(inp)) return (isDereference ? [...inp] : inp) as unknown as Val
  if (objIs(inp)) return (isDereference ? {...inp} : inp) as unknown as Val

  return inp
}
