import { PropsWithChildren } from "react";
import { OrderbookService } from "@orderbook/core/utils/orderbookService";

export type OrderbookServiceState = {
  isReady: boolean;
  service?: OrderbookService;
};

export type OrderbookServiceContextProps = OrderbookServiceState & {
  enable: () => Promise<void>;
};
export type OrderbookServiceProviderProps = PropsWithChildren<{
  value: OrderbookServiceContextProps;
}>;
