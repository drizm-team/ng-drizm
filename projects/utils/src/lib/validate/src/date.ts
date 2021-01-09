/**
 * @description Validates a Date object
 * @returns A boolean value asserting the date validity
 */
export function isValidDateInstance(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.valueOf());
}
