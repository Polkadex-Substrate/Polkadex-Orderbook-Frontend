import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

export default async function proxies(req: NextApiRequest, res: NextApiResponse) {
  try {
    const proxies = await prisma.proxies.findMany();
    const updatedData = proxies.map((acc) => {
      return serializeBigInt(acc);
    });
    res.status(200).json({data: updatedData });
  } catch (error) {
    res.status(500).json({data: error.message})
  }
}
