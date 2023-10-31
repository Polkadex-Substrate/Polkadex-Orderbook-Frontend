import { trimFloat } from "@orderbook/core/helpers";

export interface BalanceFormatterAdapter {
  toHuman: (value: bigint | number, decimal: number, locale?: string) => string;
}

export class BalanceFormatter implements BalanceFormatterAdapter {
  toHuman(value: number | bigint, decimal: number, locale?: string): string {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
      style: "decimal",
    });

    let result = formatter.format(value);

    // Trim the value (don't round off)
    result = trimFloat({ value: result, digitsAfterDecimal: decimal });

    return result;
  }
}
