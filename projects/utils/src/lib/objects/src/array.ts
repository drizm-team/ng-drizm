import {copy} from './generic';

/**
 * @description Removes items from an array
 * @returns The original array or its copy, depending on the withCopy parameter
 */
export function remove<T>(arr: T[], items: T | T[], withCopy?: boolean): T[] {
  items = Array.isArray(items) ? items : [items];
  const indexes: number[] = items.map(i => arr.indexOf(i));

  const removeItems = (targetArr: T[]): void => {
    indexes.forEach(i => targetArr.splice(i, 1));
  };

  if (withCopy) {
    const newArr = copy<T[]>(arr);
    removeItems(newArr);
    return newArr;
  }
  removeItems(arr);
  return arr;
}
