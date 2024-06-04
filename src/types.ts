export type Constructor<T = object> = new (...args: any[]) => T

export type IntersectingFields<S, T> = {
  [K in keyof S & keyof T]: [S[K], T[K]] extends [T[K], S[K]] ? K : never;
}[keyof S & keyof T]

export interface Constructable<Cls> {
  new (): Cls
}
