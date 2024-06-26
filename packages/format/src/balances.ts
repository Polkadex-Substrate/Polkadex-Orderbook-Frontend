import { trimFloat } from "@orderbook/core/helpers";

export class BalanceFormatter {
  static toHuman(
    value: number | bigint,
    decimal: number,
    locale?: string
  ): string {
    let result = Number(value).toFixed(decimal);
    // Trim the value (don't round off)
    result = trimFloat({ value: result, digitsAfterDecimal: 8 });

    return result;
  }
}
