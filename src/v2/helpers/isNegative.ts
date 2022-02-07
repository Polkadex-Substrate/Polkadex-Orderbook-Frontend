/**
 * Verify if a number is negative
 *
 * @param {string} e -  value to be verified
 * @returns {boolean} - true if negative
 */
export const isNegative = (value: string): boolean => /\+/.test(value);
