import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function assets(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const assets = await prisma.assets.findMany({
      where: {
        main_acc: +id,
      },
      select: {
        free_balance: true,
        reserved_balance: true,
        asset_type: true,
      },
    });
    const updatedData = assets.map((acc) => {
      return serializeBigInt(acc);
    });

    res.status(200).json({ data: updatedData });
  } catch (error) {
    console.log("/api/user/assets", error);
    res.status(500).json({ data: error.message });
  }
}
