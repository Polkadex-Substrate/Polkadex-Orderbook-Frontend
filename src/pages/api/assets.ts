import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

export default async function assets(req: NextApiRequest, res: NextApiResponse) {
  try {
    const assets = await prisma.assets.findMany();
    const updatedData = assets.map((acc) => {
      return serializeBigInt(acc);
    });

    res.status(200).json({ data: updatedData });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
