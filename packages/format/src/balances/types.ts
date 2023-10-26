export interface BalanceFormatterAdapter {
  toHuman: (value: bigint | number, decimal: number, locale: string) => string;
}
