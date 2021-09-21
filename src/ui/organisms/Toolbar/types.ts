import { Market } from "src/modules";

export type Props = {
  lastPrice: string;
  currentPrice: string;
  volume: string;
  changeLow: string;
  changeHigh: string;
  color: "white" | "red" | "green";
  markets: Market[];
  currentMarket: Market;
};
