import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    res.status(400).json({ message: "the id is required and must be a single value" });
    return
  }
  const main = await prisma.wouldYouRatherMain.findFirst({
    where: {
      id: id
    },
    include: {
      question: true
    }
  })
  if (!main) {
    res.status(404).json({ message: "not found" })
    return
  }
  res.json(main)
}
