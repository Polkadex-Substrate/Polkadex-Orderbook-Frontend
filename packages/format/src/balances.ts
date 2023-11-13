import { trimFloat } from "@orderbook/core/helpers";

export class BalanceFormatter {
  static toHuman(
    value: number | bigint,
    decimal: number,
    locale?: string
  ): string {
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