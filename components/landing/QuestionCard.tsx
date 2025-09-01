import { Button } from "../ui/button";
import { WouldYouRatherQuestion } from "../../types";
import { Play, Clock, Sparkles } from "lucide-react";
import { QuestionSet } from "@/pages";



interface QuestionCardProps {
    questionSet: QuestionSet;
    onPlay: (set: QuestionSet) => void;
    index?: number;
}

export default function QuestionCard({ questionSet, onPlay, index = 0 }: QuestionCardProps) {
    return (
        <div 
            className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 p-6 transform hover:scale-105 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                            {questionSet.title}
                        </h3>
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full group-hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(questionSet.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                            {questionSet.question.length} questions
                        </span>
                    </div>
                </div>

                {/* Sample Questions */}
                <div className="mb-6">
                    <h4 className="text-gray-300 font-semibold mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Preview Questions
                    </h4>
                    <div className="space-y-3">
                        {questionSet.question.slice(0, 2).map((question, qIndex) => (
                            <div key={question.id} className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 group-hover:border-gray-500/50 transition-colors duration-300">
                                <div className="text-sm text-gray-400 mb-2 font-medium">Question {qIndex + 1}</div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-3 hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300">
                                        <div className="text-blue-300 font-bold mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                                            Option A
                                        </div>
                                        <p className="text-white text-sm leading-relaxed line-clamp-2">{question.optionOne}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-3 hover:from-purple-500/20 hover:to-purple-600/20 transition-all duration-300">
                                        <div className="text-purple-300 font-bold mb-2 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                            Option B
                                        </div>
                                        <p className="text-white text-sm leading-relaxed line-clamp-2">{question.optionTwo}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex">
                    <Button
                        onClick={() => onPlay(questionSet)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Play Now
                    </Button>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    );
}