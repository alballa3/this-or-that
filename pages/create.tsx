import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { WouldYouRatherQuestion } from "../types";
import { useState } from "react";
import { Plus, Save, Eye, ArrowLeft, Trash2, Sparkle } from "lucide-react";
import { useRouter } from "next/router";
import AIQuestionGenerator from "../components/AIQuestionGenerator";
import { toast, Toaster } from "sonner";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from 'next';

export default function Create() {
    const router = useRouter();
    const t = useTranslations("create");
    const [title, setTitle] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [createdQuestions, setCreatedQuestions] = useState<WouldYouRatherQuestion[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [save, setSave] = useState(false)

    const handleAIQuestionsGenerated = (questions: WouldYouRatherQuestion[]) => {
        setCreatedQuestions(prev => [...prev, ...questions]);
    };

    const handleCreateQuestion = () => {
        if (!optionOne.trim() || !optionTwo.trim()) {
            toast.error(t("messages.fillBothOptions"));
            return;
        }

        const newQuestion: WouldYouRatherQuestion = {
            id: String(Date.now()),
            optionOne: optionOne.trim(),
            optionTwo: optionTwo.trim()
        };

        setCreatedQuestions(prev => [...prev, newQuestion]);
        setOptionOne("");
        setOptionTwo("");
    };

    const handleDeleteQuestion = (id: string) => {
        setCreatedQuestions(prev => prev.filter(q => q.id !== id));
    };

    const handleSaveQuestions = async () => {
        // In a real app, you'd save to a database or local storage
        // For now, we'll just show a success message
        if (createdQuestions.length === 0) {
            toast.error(t("messages.noQuestionsToSave"));
            return;
        }
        if (title.length == 0) {
            toast.error(t("messages.noTitle"));
            return;
        }
        // Save to localStorage for demo purposes with title
        const questionSet = {
            title: title,
            questions: createdQuestions,
        };
        setSave(true)
        console.log(questionSet)
        const res = await fetch("/api/main/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(questionSet)
        })
        const data = await res.json();
        console.log(data)
        setSave(false)
        if (!res.ok) {
            toast.error(data.message || t("messages.errorOccurred"))
            return;

        }
        router.push('/')
        console.log('Saved question set:', questionSet);
        // setCreatedQuestions([]);
    };

    // Preview Mode
    if (showPreview && createdQuestions.length > 0) {
        const currentQuestion = createdQuestions[previewIndex];

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <Toaster />
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
                        <p className="text-gray-300 mb-8">{t("preview.title")}</p>

                        <div className="flex items-center justify-center space-x-6 mb-4">
                            <span className="text-lg text-gray-400">
                                {t("preview.questionCounter", { current: previewIndex + 1, total: createdQuestions.length })}
                            </span>
                        </div>
                    </div>

                    {/* Current Question */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl text-white font-medium">
                            {t("preview.wouldYouRather")}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-blue-600 hover:bg-blue-700 rounded-3xl p-8 h-64 flex items-center justify-center text-center shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105">
                            <div>
                                <div className="text-blue-100 font-bold text-lg mb-4">{t("preview.optionALabel")}</div>
                                <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                                    {currentQuestion.optionOne}
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-600 hover:bg-purple-700 rounded-3xl p-8 h-64 flex items-center justify-center text-center shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105">
                            <div>
                                <div className="text-purple-100 font-bold text-lg mb-4">{t("preview.optionBLabel")}</div>
                                <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                                    {currentQuestion.optionTwo}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Preview Controls */}
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={() => setPreviewIndex(prev => Math.max(0, prev - 1))}
                            disabled={previewIndex === 0}
                            variant="outline"
                            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black disabled:opacity-50"
                        >
                            {t("preview.previousButton")}
                        </Button>
                        <Button
                            onClick={() => setPreviewIndex(prev => Math.min(createdQuestions.length - 1, prev + 1))}
                            disabled={previewIndex === createdQuestions.length - 1}
                            variant="outline"
                            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black disabled:opacity-50"
                        >
                            {t("preview.nextButton")}
                        </Button>
                        <Button
                            onClick={() => setShowPreview(false)}
                            className="bg-white text-black hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t("preview.backButton")}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">{t("subtitle")}</p>

                    {/* Title Input */}
                    <div className="max-w-md mx-auto mb-8">
                        <label className="block text-white font-semibold mb-3 text-lg">
                            {t("titleInput.label")}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t("titleInput.placeholder")}
                            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-center text-xl font-semibold"
                            maxLength={50}
                        />
                        <div className="text-right text-gray-400 text-sm mt-1">
                            {title.length}/50 {t("titleInput.charactersLabel")}
                        </div>
                    </div>
                </div>

                {/* Question Creator Tabs */}
                <Tabs defaultValue="manual" className="mb-8">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                        <TabsTrigger value="manual" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300">
                            <Plus className="w-4 h-4 mr-2" />
                            {t("tabs.manual")}
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
                            <Sparkle className="w-4 h-4 mr-2" />
                            {t("tabs.ai")}
                        </TabsTrigger>
                    </TabsList>

                    {/* Manual Creation Tab */}
                    <TabsContent value="manual" className="mt-6">
                        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">{t("manual.title")}</h2>

                            <div className="space-y-6">
                                {/* Option A Input */}
                                <div>
                                    <label className="block text-blue-300 font-semibold mb-3 text-lg">
                                        {t("manual.optionA")}
                                    </label>
                                    <textarea
                                        value={optionOne}
                                        onChange={(e) => setOptionOne(e.target.value)}
                                        placeholder={t("manual.placeholderA")}
                                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                                        rows={3}
                                        maxLength={150}
                                    />
                                    <div className="text-right text-gray-400 text-sm mt-1">
                                        {optionOne.length}/150 {t("titleInput.charactersLabel")}
                                    </div>
                                </div>

                                {/* Option B Input */}
                                <div>
                                    <label className="block text-purple-300 font-semibold mb-3 text-lg">
                                        {t("manual.optionB")}
                                    </label>
                                    <textarea
                                        value={optionTwo}
                                        onChange={(e) => setOptionTwo(e.target.value)}
                                        placeholder={t("manual.placeholderB")}
                                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                                        rows={3}
                                        maxLength={150}
                                    />
                                    <div className="text-right text-gray-400 text-sm mt-1">
                                        {optionTwo.length}/150 {t("titleInput.charactersLabel")}
                                    </div>
                                </div>

                                {/* Create Button */}
                                <div className="text-center">
                                    <Button
                                        onClick={handleCreateQuestion}
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
                                        disabled={!optionOne.trim() || !optionTwo.trim()}
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        {t("manual.addButton")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* AI Generator Tab */}
                    <TabsContent value="ai" className="mt-6">
                        <AIQuestionGenerator onQuestionsGenerated={handleAIQuestionsGenerated} />
                    </TabsContent>


                </Tabs>

                {/* Created Questions List */}
                {createdQuestions.length > 0 && (
                    <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {t("questionsList.title", { count: createdQuestions.length })}
                            </h2>
                            <div className="flex space-x-3">
                                <Button
                                    onClick={() => setShowPreview(true)}
                                    variant="outline"
                                    className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    {t("questionsList.previewButton")}
                                </Button>
                                <Button
                                    onClick={handleSaveQuestions}
                                    disabled={save}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {t("questionsList.saveButton")}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {createdQuestions.map((question, index) => (
                                <div key={question.id} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-gray-400 font-semibold">{t("questionsList.questionLabel", { number: index + 1 })}</span>


                                        </div>
                                        <Button
                                            onClick={() => handleDeleteQuestion(question.id)}
                                            variant="outline"
                                            size="sm"
                                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4">
                                            <div className="text-blue-300 font-semibold mb-2">{t("questionsList.optionALabel")}</div>
                                            <p className="text-white">{question.optionOne}</p>
                                        </div>
                                        <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4">
                                            <div className="text-purple-300 font-semibold mb-2">{t("questionsList.optionBLabel")}</div>
                                            <p className="text-white">{question.optionTwo}</p>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {createdQuestions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">{t("emptyState.emoji")}</div>
                        <p className="text-gray-400 text-lg">
                            {t("emptyState.message")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    };
}