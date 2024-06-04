import type { Constructable, IntersectingFields } from '@/types'

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

export const obj = {
  copyIntersectingFields,
  merge,
}
