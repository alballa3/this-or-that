export interface WouldYouRatherQuestion {
    id: string;
    title?:string
    optionOne: string;
    optionTwo: string;
}
export interface userChoise {
    questionID: string[]
    questionAnswer:string[]
}