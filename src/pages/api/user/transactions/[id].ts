import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const data = await userTransactions(BigInt(id as string));
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}

export const userTransactions = async (
  accId: bigint,
  selector: Record<string, boolean> | null = {
    txid: true,
    id: true,
    base_asset_type: true,
    quote_asset_type: true,
    order_side: true,
    timestamp: true,
    order_type: true,
    status: true,
    qty: true,
    price: true,
    trade_history: true,
    filled_price: true,
    filled_qty: true,
  }
) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      main_account_id: accId,
    },
    select: selector,
  });
  const updatedData = transactions.map((acc) => {
    return serializeBigInt(acc);
  });

  return updatedData;
};
