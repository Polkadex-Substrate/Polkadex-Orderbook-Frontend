import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma";
import { serializeBigInt } from "@polkadex/orderbook/helpers/serializeBigInt";

/** Gets the users main account */
export default async function accounts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const userAcc = await getUserAcc(+id, { main_acc: true})
    res.status(200).json({ data: userAcc?.main_acc });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}


export const getUserAcc = async (accId: number, selector: Record<string, boolean> | null) => {
  const accounts = await prisma.accounts.findFirst({
    where: {
      id: accId,
    },
    select: selector
  });

  return serializeBigInt(accounts)
}
