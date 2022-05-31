import { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ data: "Working" });
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}
