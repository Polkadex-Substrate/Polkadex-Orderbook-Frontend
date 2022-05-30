import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await prisma.transactions.findMany();
    res.status(200).json({ data: transactions.map((tx) => serializeBigInt(tx)) });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
