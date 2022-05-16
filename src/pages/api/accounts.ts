import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export default async function accounts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accounts = await prisma.accounts.findMany();
    const updatedData = accounts.map((acc) => {
      return serializeBigInt(acc);
    });

    res.status(200).json({data: updatedData });
  } catch (error) {
    res.status(500).json({data: error.message})
  }
}
