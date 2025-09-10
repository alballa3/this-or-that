import { readFileSync } from "fs";
import path from "path";
import { prisma } from "./prisma";
interface WouldYouRatherMain {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}
interface WouldYouRatherQuestion {
    id: string;
    optionOne: string;
    optionTwo: string;
    wouldYouRatherMainId: string;
    "createdAt": string,
    updatedAt: string
}
(async () => {

    const pathMain = path.join(process.cwd(), "lib", "data", "WouldYouRatherMain.json")
    const fileMain = readFileSync(pathMain)
    const pathQuestion = path.join(process.cwd(), "lib", "data", "WouldYouRatherQuestion.json")
    const fileQuestions = readFileSync(pathQuestion)

    const fileMainData:WouldYouRatherMain[] = JSON.parse(fileMain.toString())
    const fileQuestionsData:WouldYouRatherQuestion[] = JSON.parse(fileQuestions.toString())
    for(const main of fileMainData){
        const data = await prisma.wouldYouRatherMain.create({
            data:{
                id: main.id,
                title: main.title,
                createdAt: new Date(main.createdAt),
                updatedAt: new Date(main.updatedAt),
                question:{
                    createMany:{
                        data: fileQuestionsData.filter((question)=>question.wouldYouRatherMainId === main.id).map((question)=>({
                            id: question.id,
                            optionOne: question.optionOne,
                            optionTwo: question.optionTwo,
                            createdAt: new Date(question.createdAt),
                            updatedAt: new Date(question.updatedAt)
                        }))
                    }
                }
            },
        })
        console.log(data)
    }
})()