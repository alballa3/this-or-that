import { WouldYouRatherQuestion } from "@/types";

const sampleQuestions = [
    { 
        optionOne: "Have the ability to fly", 
        optionTwo: "Be invisible",
        tags: ["superpowers", "fantasy"],
        category: "Fantasy",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Eat only pizza for a year", 
        optionTwo: "Eat only burgers for a year",
        tags: ["food", "funny"],
        category: "Food & Drink",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Live without internet", 
        optionTwo: "Live without music",
        tags: ["technology", "lifestyle", "serious"],
        category: "Technology",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Time travel to the past", 
        optionTwo: "Time travel to the future",
        tags: ["fantasy", "adventure", "hypothetical"],
        category: "Fantasy",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Speak all languages fluently", 
        optionTwo: "Talk to animals",
        tags: ["superpowers", "creative"],
        category: "Fantasy",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Always have to sing instead of speak", 
        optionTwo: "Always have to dance instead of walk",
        tags: ["funny", "lifestyle", "creative"],
        category: "Entertainment",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Never be able to lie", 
        optionTwo: "Never be able to tell the truth",
        tags: ["moral", "serious", "hypothetical"],
        category: "General",
        difficulty: "hard" as const
    },
    { 
        optionOne: "Have unlimited money but no friends", 
        optionTwo: "Have a few close friends but be poor",
        tags: ["relationships", "moral", "serious"],
        category: "Relationships",
        difficulty: "hard" as const
    },
    { 
        optionOne: "Live on the beach forever", 
        optionTwo: "Live in the mountains forever",
        tags: ["travel", "lifestyle"],
        category: "Travel",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Eat spicy food every day", 
        optionTwo: "Eat sweet food every day",
        tags: ["food", "lifestyle"],
        category: "Food & Drink",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Read minds but can't turn it off", 
        optionTwo: "Be able to teleport but arrive naked",
        tags: ["superpowers", "funny", "hypothetical"],
        category: "Fantasy",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Have super strength", 
        optionTwo: "Have super speed",
        tags: ["superpowers", "fantasy"],
        category: "Fantasy",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Live in a world without books", 
        optionTwo: "Live in a world without movies",
        tags: ["entertainment", "serious", "hypothetical"],
        category: "Entertainment",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Always be 10 minutes late", 
        optionTwo: "Always be 20 minutes early",
        tags: ["lifestyle", "funny"],
        category: "Lifestyle",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Have the ability to pause time", 
        optionTwo: "Have the ability to rewind time",
        tags: ["superpowers", "fantasy", "hypothetical"],
        category: "Fantasy",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Be famous but constantly criticized", 
        optionTwo: "Be unknown but respected by few",
        tags: ["career", "relationships", "serious"],
        category: "Career",
        difficulty: "hard" as const
    },
    { 
        optionOne: "Have perfect memory", 
        optionTwo: "Have the ability to forget anything",
        tags: ["superpowers", "hypothetical", "serious"],
        category: "General",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Live underwater", 
        optionTwo: "Live in space",
        tags: ["adventure", "science", "fantasy"],
        category: "Science",
        difficulty: "medium" as const
    },
    { 
        optionOne: "Have wings but can't fly", 
        optionTwo: "Have gills but live on land",
        tags: ["funny", "hypothetical", "animals"],
        category: "Fantasy",
        difficulty: "easy" as const
    },
    { 
        optionOne: "Control fire", 
        optionTwo: "Control ice",
        tags: ["superpowers", "fantasy"],
        category: "Fantasy",
        difficulty: "easy" as const
    }
];

export let data: WouldYouRatherQuestion[] = sampleQuestions.map((e, i): WouldYouRatherQuestion => {
    return {
        id: String(i + 1),
        optionOne: e.optionOne,
        optionTwo: e.optionTwo,
    }
})