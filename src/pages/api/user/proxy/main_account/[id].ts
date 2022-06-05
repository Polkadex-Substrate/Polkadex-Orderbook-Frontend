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
    if (proxy) {
      const main_addr = await getMainAccountAddress(proxy.main_acc_id);
      res.status(200).json({ data: serializeBigInt({ ...proxy, main_addr }) });
    } else {
      throw new Error("Proxy account not found");
    }
  } catch (error) {
    console.log("/api/user/proxy/main_account", error);
    res.status(500).json({ data: error.message });
  }
}

async function getMainAccountAddress(main_acc_id: bigint) {
  const res = await prisma.accounts.findFirst({
    where: {
      id: main_acc_id,
    },
    select: {
      main_acc: true,
    },
  });
  return res.main_acc;
}
