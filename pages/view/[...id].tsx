import { Button } from "@/components/ui/button";

import { userChoise, WouldYouRatherQuestion } from "@/types";
import { useEffect, useState } from "react";
import { ChevronRight, RotateCcw, Sparkles, Plus } from "lucide-react";
import { useRouter } from "next/router";
import Custom404 from "../404";
import { useTranslations } from "next-intl";
import { GetServerSidePropsContext } from 'next';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const t = useTranslations("game");
  const [questions, setQuestion] = useState<WouldYouRatherQuestion[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<userChoise>()
  const [isCheck, setIsCheck] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    if (!id) return; // wait until router.query.id is ready

    const handle = async () => {

      const res = await fetch(`/api/main/${id}`)
      const json = await res.json()
      console.log(json, `/api/main/${id}`)
      if (!res.ok) {
        router.push('/404')
        return;
      }

      setQuestion(json.question.sort(() => Math.random() - 0.5))
    }
    handle()
  }, [id])

  if (!questions) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const handlenextQuestion = () => {
    if ((questions.length - 1) <= currentQuestionIndex) {
      setShowCompletion(true);
      return;
    }
    setCurrentQuestionIndex((e) => e + 1)
    setIsCheck(true)
    setSelectedOption(null)
  }

  const handleSelect = (question_answer: string) => {
    let questionID = questions.find((e) => e.optionOne == question_answer || e.optionTwo == question_answer)?.id
    if (!questionID) return;

    setSelectedQuestion((prev) => ({
      questionAnswer: [...(prev?.questionAnswer || []), question_answer],
      questionID: [...(prev?.questionID || []), questionID]
    }))
    setSelectedOption(question_answer)
    setIsCheck(false)
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setSelectedQuestion(undefined)
    setIsCheck(true)
    setSelectedOption(null)
    setShowCompletion(false)
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="animate-bounce">
            <Sparkles className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t("completion.title")}</h1>
          <p className="text-gray-300 text-lg mb-8">
            {t("completion.message", { count: questions.length })}
          </p>
          <div className="space-y-4">
            <Button
              onClick={resetGame}
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold w-full"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t("completion.playAgain")}
            </Button>
            <div className="flex space-x-3">
              <Button
                onClick={() => router.push('/create')}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("completion.createMore")}
              </Button>

            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <div className="text-center py-8 px-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
          {t("title")}
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => router.push('/create')}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("createQuestions")}
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <span className="text-sm">{t("questionCounter", { current: currentQuestionIndex + 1, total: questions.length })}</span>
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1 */}
            <div
              className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedOption === questions[currentQuestionIndex].optionOne
                ? 'ring-4 ring-blue-500 bg-gradient-to-br from-blue-900/30 to-blue-700/30'
                : 'hover:bg-gray-800/50'
                }`}
              onClick={() => handleSelect(questions[currentQuestionIndex].optionOne)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 h-full flex items-center justify-center text-center">
                <div>
                  <div className="text-blue-300 font-semibold text-sm mb-3">{t("optionA")}</div>
                  <p className="text-white text-xl font-medium leading-relaxed">
                    {questions[currentQuestionIndex]?.optionOne}
                  </p>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div
              className={`group cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedOption === questions[currentQuestionIndex].optionTwo
                ? 'ring-4 ring-purple-500 bg-gradient-to-br from-purple-900/30 to-purple-700/30'
                : 'hover:bg-gray-800/50'
                }`}
              onClick={() => handleSelect(questions[currentQuestionIndex].optionTwo)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 h-full flex items-center justify-center text-center">
                <div>
                  <div className="text-purple-300 font-semibold text-sm mb-3">{t("optionB")}</div>
                  <p className="text-white text-xl font-medium leading-relaxed">
                    {questions[currentQuestionIndex]?.optionTwo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handlenextQuestion}
              disabled={isCheck}
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-600 px-8 py-3 text-lg font-semibold disabled:opacity-50"
            >
              {currentQuestionIndex === questions.length - 1 ? t("finish") : t("nextQuestion")}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black px-6 py-3 font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("reset")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}