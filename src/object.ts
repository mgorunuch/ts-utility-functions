import type { Constructable, IntersectingFields } from './types'

/**
 * Copies intersecting fields from one object to another.
 */
export function copyIntersectingFields<FromObject, ToObject>(
  from: FromObject,
  to: ToObject,
  fieldsToIntersect: readonly IntersectingFields<FromObject, ToObject>[],
): void {
  fieldsToIntersect.forEach((fieldName) => {
    // @ts-expect-error I have no time to fix this
    to[fieldName] = from[fieldName]
  })
}

export function copyIntersectingFieldsToNew<FromObject, ToObject>(
  from: FromObject,
  ToCls: Constructable<ToObject>,
  fieldsToApply: readonly IntersectingFields<FromObject, ToObject>[],
): ToObject {
  const toObject = new ToCls()
  copyIntersectingFields(from, toObject, fieldsToApply)
  return toObject
}

copyIntersectingFields.toNew = copyIntersectingFieldsToNew

function merge2<Obj extends object>(
  base: Obj,
  additional: Partial<Obj>,
): Obj {
  return {
    ...base,
    ...additional,
  }
}

export function objMerge<Obj extends object>(
  base: Obj,
  ...additional: readonly (Partial<Obj> | undefined)[]
): Obj {
  return additional.reduce(merge2, base)
}

export function objValues<Obj extends object>(
  obj: Obj,
): readonly Obj[keyof Obj][] {
  return Object.values(obj)
}

export function objKeys<Obj extends object>(
  obj: Obj,
): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}

export function isObjEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

export function isObjNotEmpty(obj: object): boolean {
  return !isObjEmpty(obj)
}

export function isObj(val: any): val is object {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}
