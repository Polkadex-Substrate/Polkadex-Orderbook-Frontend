import { appsyncOrderbookService } from "../utils/orderbookService";

export const exportOrderHistory = async (
  mainAddress: string,
  from: Date,
  to: Date
) => {
  const data = await appsyncOrderbookService.query.getAllOrderHistory({
    address: mainAddress,
    from,
    to,
  });
  return data;
};

export const exportTradeHistory = async (
  tradeAddress: string,
  from: Date,
  to: Date
) => {
  const data = await appsyncOrderbookService.query.getAllTradeHistory({
    address: tradeAddress,
    from,
    to,
  });
  return data;
};
