import { WouldYouRatherQuestion } from "../../types";
import QuestionCard from "./QuestionCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface QuestionSet {
    id: string;
    title: string;
    questions: WouldYouRatherQuestion[];
    createdAt: string;
}

interface QuestionSectionProps {
    title: string;
    subtitle: string;
    icon: string;
    questionSets: QuestionSet[];
    onPlay: (set: QuestionSet) => void;
    onViewAll?: () => void;
    sectionId?: string;
}

export default function QuestionSection({ 
    title, 
    subtitle, 
    icon, 
    questionSets, 
    onPlay, 
    onViewAll,
    sectionId 
}: QuestionSectionProps) {
    return (
        <section id={sectionId} className="mb-20 animate-fade-in">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
                <div className="animate-slide-up">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mr-4 backdrop-blur-sm border border-blue-500/30">
                            <span className="text-3xl">{icon}</span>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                                {title}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p>
                </div>
                {onViewAll && (
                    <Button
                        onClick={onViewAll}
                        variant="outline"
                        className="border-2 border-gray-500/50 text-gray-400 hover:bg-gray-500 hover:text-white rounded-xl backdrop-blur-sm bg-gray-500/10 transform hover:scale-105 transition-all duration-300 animate-slide-up delay-200"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>

            {questionSets.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 animate-slide-up">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-2xl mx-auto mb-6">
                        <span className="text-5xl">🤔</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Questions Yet</h3>
                    <p className="text-gray-400 text-lg">Be the first to create amazing question sets!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {questionSets.map((set, index) => (
                        <QuestionCard
                            key={set.id}
                            questionSet={set}
                            onPlay={onPlay}
                            index={index}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                    animation-fill-mode: both;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
            `}</style>
        </section>
    );
}