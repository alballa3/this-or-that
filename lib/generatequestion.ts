import { WouldYouRatherQuestion } from "@/types";

const sampleQuestions = [
    { optionOne: "Have the ability to fly", optionTwo: "Be invisible" },
    { optionOne: "Eat only pizza for a year", optionTwo: "Eat only burgers for a year" },
    { optionOne: "Live without internet", optionTwo: "Live without music" },
    { optionOne: "Time travel to the past", optionTwo: "Time travel to the future" },
    { optionOne: "Speak all languages fluently", optionTwo: "Talk to animals" },
    { optionOne: "Always have to sing instead of speak", optionTwo: "Always have to dance instead of walk" },
    { optionOne: "Never be able to lie", optionTwo: "Never be able to tell the truth" },
    { optionOne: "Have unlimited money but no friends", optionTwo: "Have a few close friends but be poor" },
    { optionOne: "Live on the beach forever", optionTwo: "Live in the mountains forever" },
    { optionOne: "Eat spicy food every day", optionTwo: "Eat sweet food every day" },
];
export let data: WouldYouRatherQuestion[] = sampleQuestions.map((e, i): WouldYouRatherQuestion => {
    return {
        id: String(i + 1),
        optionOne: e.optionOne,
        optionTwo: e.optionTwo
    }
})