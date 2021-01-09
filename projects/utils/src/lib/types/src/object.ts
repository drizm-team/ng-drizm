/**
 * @description A generic unknown object type. Only use it if you don't know the exact shape of the object or for very generic properties
 */
export type IObject<T = unknown, U = {[key: string]: T}> = U & {
  [key: string]: T;
};
