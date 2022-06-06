import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../../prisma";

import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

/** Gets the users accounts ID */
export default async function accounts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const accounts = await prisma.accounts.findFirst({
      where: {
        main_acc: id.toString(),
      },
      select: {
        id: true,
      },
    });

    res.status(200).json({ data: serializeBigInt(accounts)?.id });
  } catch (error) {
    console.log("/api/user/accounts/get_account_id", error);
    res.status(500).json({ data: error.message });
  }
}
