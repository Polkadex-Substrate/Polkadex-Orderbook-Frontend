import { BalanceFormatter } from "../balances";

describe("Balance Formatter <> toHuman function", () => {
  const formatter = new BalanceFormatter();
  const locale = "en";
  test("Should format 0.0001999 to 0.0001", () => {
    expect(formatter.toHuman(0.0001999, 5, locale)).toEqual(0.0001);
  });
});
