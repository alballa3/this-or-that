import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const QuestionSchema = z.object({
    optionOne: z.string().min(1, "Option One is required and cannot be empty"),
    optionTwo: z.string().min(1, "Option Two is required and cannot be empty"),
});

const WouldYouRatherSchema = z.object({
    title: z.string().min(1, "Title is required and cannot be empty"),
    questions: z
        .array(QuestionSchema)
        .min(1, "At least one question is required"), // array must have at least one question
});
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method != "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return
    }

    const result = WouldYouRatherSchema.safeParse(req.body)
    if (!result.success) {
        res.status(400).json({ message: "ERROR WHILE VAILDITION DATA", error: result.error.flatten().fieldErrors });
        return
    }
    const save = await prisma.wouldYouRatherMain.create({
        data: {
            title: result.data.title,
            question: {
                createMany: {
                    data: result.data.questions.map((item) => ({
                        optionOne: item.optionOne,
                        optionTwo: item.optionTwo
                    }))
                }
            }
        },
        include: {
            question: true
        }
    })
    res.json(save)
}
