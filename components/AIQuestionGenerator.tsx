import { Button } from "./ui/button";
import { WouldYouRatherQuestion } from "../types";
import { useState } from "react";
import { Plus, Sparkles, RefreshCw, Tag, Wand2 } from "lucide-react";
import { toast, Toaster } from "sonner";

interface AIQuestionGeneratorProps {
    onQuestionsGenerated: (questions: WouldYouRatherQuestion[]) => void;
}

export default function AIQuestionGenerator({ onQuestionsGenerated }: AIQuestionGeneratorProps) {
    // AI Generator states
    const [aiPrompt, setAiPrompt] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<WouldYouRatherQuestion[]>([]);

    // Available tags and categories
    const availableTags = [
        "funny", "serious", "hypothetical", "moral", "creative", "adventure",
        "food", "technology", "relationships", "career", "superpowers", "travel",
        "lifestyle", "entertainment", "sports", "animals", "science", "fantasy"
    ];

    const availableCategories = [
        "General", "Entertainment", "Food & Drink", "Technology", "Travel",
        "Relationships", "Career", "Lifestyle", "Adventure", "Fantasy", "Science"
    ];

    const handleToggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const generateAIQuestions = async () => {
        setIsGenerating(true);
        try {
            // Simulate AI generation - in a real app, you'd call an AI API
            const res = await fetch("/api/main/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: `The User Promt:${aiPrompt} and the selected Tags ${selectedTags.join(" ")} and the Category about ${selectedCategory} and the Difficulty is ${selectedDifficulty} `,
                })
            }
            );
            if (!res.ok) throw new Error("Failed to generate questions");
            const data = await res.json() as WouldYouRatherQuestion[];
            console.log(data, typeof data)
            setGeneratedQuestions(data.map((e) => {
                return {
                    ...e, id: `ai-${Date.now()}-${Math.random()}`
                }
            }));

        } catch (error) {
            console.log(error)
            toast.error("Failed to generate questions. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const addGeneratedQuestion = (question: WouldYouRatherQuestion) => {
        onQuestionsGenerated([question]);
        setGeneratedQuestions(prev => prev.filter(q => q.id !== question.id));
    };

    const addAllGeneratedQuestions = () => {
        onQuestionsGenerated(generatedQuestions);
        setGeneratedQuestions([]);
    };

    return (
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <Toaster />
            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Wand2 className="w-6 h-6 mr-3 text-gray-400" />
                AI Question Generator
            </h2>

            <div className="space-y-6">
                {/* AI Prompt Input */}
                <div>
                    <label className="block text-blue-300 font-semibold mb-3 text-lg">
                        ✨ Describe what kind of questions you want
                    </label>
                    <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g., 'Create funny questions about food choices' or 'Generate serious moral dilemmas about technology'"
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                        rows={3}
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-purple-300 font-semibold mb-3 text-lg">
                        📂 Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                    >
                        <option value="">Select a category (optional)</option>
                        {availableCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Difficulty Selection */}
                <div>
                    <label className="block text-gray-300 font-semibold mb-3 text-lg">
                        🎯 Difficulty Level
                    </label>
                    <div className="flex space-x-4">
                        {(['easy', 'medium', 'hard'] as const).map(difficulty => (
                            <button
                                key={difficulty}
                                onClick={() => setSelectedDifficulty(difficulty)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${selectedDifficulty === difficulty
                                    ? 'bg-white text-black'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags Selection */}
                <div>
                    <label className="block text-gray-300 font-semibold mb-3 text-lg">
                        🏷️ Tags (optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleToggleTag(tag)}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    {selectedTags.length > 0 && (
                        <div className="mt-2 text-sm text-gray-300">
                            Selected: {selectedTags.join(', ')}
                        </div>
                    )}
                </div>

                {/* Generate Button */}
                <div className="text-center">
                    <Button
                        onClick={generateAIQuestions}
                        disabled={isGenerating || !aiPrompt.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Generate Questions
                            </>
                        )}
                    </Button>
                </div>

                {/* Generated Questions Display */}
                {generatedQuestions.length > 0 && (
                    <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-600">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Generated Questions</h3>
                            <Button
                                onClick={addAllGeneratedQuestions}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add All
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {generatedQuestions.map((question) => (
                                <div key={question.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center space-x-2">


                                        </div>
                                        <Button
                                            onClick={() => addGeneratedQuestion(question)}
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add
                                        </Button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-3">
                                            <div className="text-blue-300 font-semibold mb-1 text-sm">🪽 Option A</div>
                                            <p className="text-white text-sm">{question.optionOne}</p>
                                        </div>
                                        <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-3">
                                            <div className="text-purple-300 font-semibold mb-1 text-sm">👻 Option B</div>
                                            <p className="text-white text-sm">{question.optionTwo}</p>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}