import { trimFloat } from "@orderbook/core/helpers";

import { BalanceFormatterAdapter } from "./types";

export class BalanceFormatter implements BalanceFormatterAdapter {
  toHuman(value: number | bigint, decimal: number, locale: string): string {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
      style: "decimal",
    });

    let result = formatter.format(value);

    // Trim the value (doesn't round off)
    result = trimFloat({ value: result, digitsAfterDecimal: decimal });

    return result;
  }
}
