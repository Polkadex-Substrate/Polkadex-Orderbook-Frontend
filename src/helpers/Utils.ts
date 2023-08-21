export const Utils = {
  date: {
    formatDateToISO(date: Date | string | number): string {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    },
  },
};

export function decimalPlaces(num: number | string) {
  const match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0)
  );
}

export const getAbsoluteNumber = (value: string | number) => {
  const valueStr = value.toString();
  return parseFloat(valueStr.replace(/,/g, ""));
};

export const getDigitsAfterDecimal = (value: number | string) => {
  const amountStr = String(value);
  return amountStr.includes(".") ? amountStr.split(".")[1].length : 0;
};

export const hasOnlyZeros = (floatString: string): boolean => {
  const floatValue = parseFloat(floatString);
  const integerValue = parseInt(floatString, 10);

  return floatValue === integerValue;
};
