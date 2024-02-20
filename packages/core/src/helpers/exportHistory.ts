import { appsyncOrderbookService } from "../utils/orderbookService";

export const exportOrderHistory = async (
  tradeAddress: string,
  from: Date,
  to: Date
) => {
  const data = await appsyncOrderbookService.query.getAllOrderHistory({
    address: tradeAddress,
    from,
    to,
  });
  return data;
};
