import { Button } from "@/components/ui/button";
import { data as rawData } from "@/lib/generatequestion";
import { userChoise, WouldYouRatherQuestion } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestion] = useState<WouldYouRatherQuestion[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<userChoise>()
  const [isCheck, setIsCheck] = useState(true)
  useEffect(() => {
    setQuestion(rawData.sort(() => Math.random() - 0.5))
  }, [])
  if (!questions) return;
  const handlenextQuestion = () => {
    // the -1 is for when we use length function it does add more and we are using current index to we need to -1 
    if ((questions.length - 1) <= currentQuestionIndex) {
      alert("YOU REACHED THE MAX QUESTIONS")
      return
    };
    setCurrentQuestionIndex((e) => e + 1)
    setIsCheck(true)
  }
  const handleSelect = (question_answer: string) => {
    let questionID = questions.find((e) => e.optionOne == question_answer || e.optionTwo == question_answer)?.id
    if (!questionID) return;

    setSelectedQuestion((prev) => ({ questionAnswer: [...(prev?.questionAnswer || []), question_answer], questionID: [...(prev?.questionID || []), questionID] }))
    setIsCheck(false)
  }
  return (
    <div className="p-5">
      <h1>Would You Rather</h1>
      <section className="m-4" onClick={() => handleSelect(questions[currentQuestionIndex].optionOne)} >
        <p >{questions[currentQuestionIndex]?.optionOne}</p>
      </section>
      <section className="m-4" onClick={() => handleSelect(questions[currentQuestionIndex].optionTwo)}>
        <p>{questions[currentQuestionIndex]?.optionTwo}</p>
      </section>
      <div className="flex gap-2">
        <Button onClick={handlenextQuestion} disabled={isCheck}>Get To NEXT QUESTION</Button>
        <Button onClick={() => setCurrentQuestionIndex(0)}>Reset Question</Button>
      </div>
    </div>
  );
}
