import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { limit = 3, search = "" } = req.query
    if (Number.isNaN(Number(limit))) {
        res.status(400).json({ error: "Limit must be a number" })
        return
    }
    if (typeof search !== "string") {
        res.status(400).json({ error: "Search must be a string" })
        return
    }
    const posts = await prisma.wouldYouRatherMain.findMany({
        where: {
            title: {
                contains: search,
            },

        },
        take: Number(limit),
        include: {
            question: true
        }
    })
    res.json(posts)
}
