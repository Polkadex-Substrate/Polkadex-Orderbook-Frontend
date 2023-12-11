import { trimFloat } from "@orderbook/core/helpers";

export class BalanceFormatter {
  static toHuman(
    value: number | bigint,
    decimal: number,
    locale?: string
  ): string {
    const formatter = new Intl.NumberFormat("en-us", {
      maximumFractionDigits: 20,
      useGrouping: false,
    });
    let result = formatter.format(value);

    // Trim the value (don't round off)
    result = trimFloat({ value: result, digitsAfterDecimal: 8 });

    return result;
  }
}
