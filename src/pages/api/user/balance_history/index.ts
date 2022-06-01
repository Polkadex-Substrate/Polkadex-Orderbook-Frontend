import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma";
import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

/** Gets the users balances */
export default async function balance_history(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    const { main_acc_id, event } = req.body;
    const accounts = await prisma.balance_history.findMany({
      where: {
        main_acc_id,
        event
      },
      select: {
        asset_type: true,
        amount: true,
        status: true,
        market: true,
        timestamp: true
      },
    });

    res.status(200).json({ data: serializeBigInt(accounts)?.id });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
