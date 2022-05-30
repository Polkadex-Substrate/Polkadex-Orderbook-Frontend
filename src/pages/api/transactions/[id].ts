import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const transaction = await prisma.transactions.findFirst({
      where: {
        id: BigInt(id as string),
      },
    });
    res.status(200).json({ data: serializeBigInt(transaction) });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
