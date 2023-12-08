import { PropsWithChildren } from "react";
import {
  OrderbookService,
  Market,
  Asset,
} from "@orderbook/core/utils/orderbookService";

export type OrderbookServiceState = {
  service?: OrderbookService;
  markets: Market[];
  assets: Asset[];
};

export type OrderbookServiceContextProps = OrderbookServiceState & {
  isReady: boolean;
  enable: () => Promise<void>;
};
export type OrderbookServiceProviderProps = PropsWithChildren<{
  value: OrderbookServiceContextProps;
}>;
