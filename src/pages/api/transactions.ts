import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";
import { createOrderCommonTypes } from "@polkadex/orderbook/modules/helper";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const transactions = await prisma.transactions.findMany();
    const updatedData = transactions.map((acc) => {
      return serializeBigInt(acc);
    });

    res.status(200).json({data: createOrderCommonTypes(updatedData) });
  } catch (error) {
    res.status(500).json({data: error.message})
  }

}
