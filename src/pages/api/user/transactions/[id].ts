import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    res.status(200).json({ data: userTransactions(+id) });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}

export const userTransactions = async (
  accId: number,
  selector: Record<string, boolean> | null = {
    txid: true,
    base_asset_type: true,
    quote_asset_type: true,
    order_type: true,
    status: true,
    qty: true,
    price: true,
  }
) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      main_account_id: accId,
    },
    select: selector
  });
  const updatedData = transactions.map((acc) => {
    return serializeBigInt(acc);
  });

  return updatedData;
};
