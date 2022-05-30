import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../../prisma";

/** Gets the users main accounts through proxy account */
export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const proxy = await prisma.proxies.findFirst({
      where: {
        proxy: id.toString(),
      },
      select: {
        id: true,
      },
    });

    res.status(200).json({ data: proxy });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
