import { formatNumber, trimFloat } from "./Utils";

const DIGITS_AFTER_DECIMAL = 4;

// TODO: Need to make it more configurable
export const formatBalances = (value: string) => {
  value = Number(value).toFixed(4);
  let balance = trimFloat({
    value,
    digitsAfterDecimal: DIGITS_AFTER_DECIMAL,
  });
  balance = formatNumber(balance);
  return balance;
};
