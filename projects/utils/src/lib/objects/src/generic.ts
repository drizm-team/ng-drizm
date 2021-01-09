/**
 * @description Does a deep or shallow copy of the object
 * @returns The object copy
 */
export function copy<T extends object>(obj: T, deep = true): T {
  if (!deep) {
    if (Array.isArray(obj)) return [...obj] as T;
    return {...obj};
  }
  return JSON.parse(JSON.stringify(obj));
}
