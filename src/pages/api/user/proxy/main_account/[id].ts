import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

/** Gets the users main accounts through proxy account */
export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const proxyAddress = id.toString().trim();
    const proxy = await prisma.proxies.findFirst({
      where: {
        proxy: proxyAddress,
      },
      select: {
        id: true,
        main_acc_id: true,
      },
    });
    res.status(200).json({ data: serializeBigInt(proxy) });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
