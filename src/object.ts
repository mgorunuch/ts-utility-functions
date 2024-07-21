import type { Constructable, IntersectingFields } from '@/types'
import {arr} from "@/arr";

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

export function merge<Obj extends object>(
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

export function objKeysForEach<Obj extends object>(
  obj: Obj,
  callback: (key: keyof Obj) => void,
): void {
  objKeys(obj).forEach(callback)
}

export function objKeysMap<Obj extends object, Res>(
  obj: Obj,
  callback: (key: keyof Obj) => Res,
): Res[] {
  const res = objKeys(obj)
  return arr.mapRef(res, callback)
}

export function objKeysMapFilter<Obj extends object, Res>(
  obj: Obj,
  callback: (key: keyof Obj) => Res,
  filter: (val: Res) => boolean,
): Res[] {
  const res = objKeys(obj)
  return arr.mapFilterRef(res, callback, filter)
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

export function isNotEmpty(obj: object): boolean {
  return !isEmpty(obj)
}

export function isObject(val: any): val is object {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

export const obj = {
  copyIntersectingFields,
  merge,
  keys: objKeys,
  keysForEach: objKeysForEach,
  keysMap: objKeysMap,
  vals: objValues,
  isEmpty,
  isNotEmpty,
  is: isObject,
}
