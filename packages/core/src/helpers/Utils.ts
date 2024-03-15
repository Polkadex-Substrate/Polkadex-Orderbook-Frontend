import { MAX_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";

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

// Removes the commas from a number
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

export const formatNumber = (value: string): string => {
  return value
    .replace(/(\.\d*?)0+$/, "$1") // Remove trailing zeros after the decimal
    .replace(/\.$/, ""); // Remove the deciaml point if there are no decimal places)
};

type TrimFloatProps = {
  value: string | number;
  digitsAfterDecimal?: number;
};

export const trimFloat = ({
  value,
  digitsAfterDecimal = MAX_DIGITS_AFTER_DECIMAL,
}: TrimFloatProps): string => {
  const valueString = value.toString();
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    const numberPart = valueString.substr(
      0,
      decimalIndex + digitsAfterDecimal + 1
    );
    return formatNumber(parseFloat(numberPart).toFixed(digitsAfterDecimal));
  }

  return formatNumber(valueString);
};

export const secondsToHm = (seconds: number) => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + "d " : "";
  const hDisplay = h > 0 ? h + (h === 1 ? "hr " : " hrs ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? "min " : " mins ") : "";
  const sDisplay = s > 0 ? s + (s === 1 ? "sec" : " secs") : "";
  const dhm = dDisplay + hDisplay + mDisplay;
  if (dhm.trim().length === 0) return sDisplay;
  return dhm;
};
