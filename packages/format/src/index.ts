import { BalanceFormatter } from "./balances";

export const afun = () => {
  const a = new BalanceFormatter();

  console.log(a.toHuman(0.000199, 4, "en"), "i am here");
};
