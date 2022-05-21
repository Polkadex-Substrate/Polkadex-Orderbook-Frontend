import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma";

import { getUserAcc } from "./user/accounts/[id]";
import { userTransactions } from "./user/transactions/[id]";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await prisma.transactions.findMany();
    const updatedData = await Promise.all(
      transactions.map(async (acc) => {
        const serializedData = serializeBigInt(acc);
        const id = serializedData.main_account_id;
        const userAcc = await getUserAcc(id, { main_acc: true });
        const trades = await userTransactions(id as string, null);
        return createOrderCommonTypes({
          ...serializedData,
          main_account_id: userAcc.main_acc,
          trades,
        });
      })
    );
    res.status(200).json({ data: updatedData });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}

const createOrderCommonTypes = (data) => {
  return {
    amount: Number(data.price) * Number(data.qty),
    base_asset: +data.base_asset_type,
    quote_asset: +data.quote_asset_type,
    filled_qty: data.status,
    main_acc: data.main_account_id,
    order_id: data.txid,
    order_side: data.order_side,
    order_type: data.order_type,
    price: `${data.price}`,
    status: data.status,
    timestamp: data.timestamp,
    trades: data.trades.map((trade) => {
      return {
        id: trade.id,
        timestamp: trade.timestamp,
        order_id: trade.txid,
        order_type: trade.order_type,
        order_side: trade.order_side,
        price: trade.price,
        amount: Number(trade.price) * Number(trade.qty),
      };
    }),
  };
};
