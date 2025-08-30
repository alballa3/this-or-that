export interface WouldYouRatherQuestion {
    id: string;
    optionOne: string;
    optionTwo: string;
    tags?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    category?: string;
}
export interface userChoise {
    questionID: string[]
    questionAnswer:string[]
}