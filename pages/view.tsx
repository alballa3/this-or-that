import { useState, useEffect } from "react";
import { WouldYouRatherQuestion } from "../types";
import { toast, Toaster } from "sonner";
import HeroSection from "../components/landing/HeroSection";
import SearchSection from "../components/landing/SearchSection";
import QuestionSection from "../components/landing/QuestionSection";
import FloatingActionButton from "../components/landing/FloatingActionButton";

interface QuestionSet {
    id: string;
    title: string;
    questions: WouldYouRatherQuestion[];
    createdAt: string;
}

export default function LandingPage() {
    const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data - in real app, this would come from your backend
    useEffect(() => {
        // Simulate loading from API
        setTimeout(() => {
            const mockData: QuestionSet[] = [
                {
                    id: "1",
                    title: "Would You Rather for Friends",
                    questions: [
                        { id: "1", optionOne: "Have the ability to fly", optionTwo: "Have the ability to read minds" },
                        { id: "2", optionOne: "Live in a world without music", optionTwo: "Live in a world without movies" },
                        { id: "3", optionOne: "Always be 10 minutes late", optionTwo: "Always be 20 minutes early" }
                    ],
                    createdAt: "2024-01-15"
                },
                {
                    id: "2",
                    title: "Deep Philosophical Questions",
                    questions: [
                        { id: "4", optionOne: "Know when you will die", optionTwo: "Know how you will die" },
                        { id: "5", optionOne: "Be able to change the past", optionTwo: "Be able to see the future" }
                    ],
                    createdAt: "2024-01-10"
                },
                {
                    id: "3",
                    title: "Work & Career Dilemmas",
                    questions: [
                        { id: "6", optionOne: "Work your dream job for minimum wage", optionTwo: "Work a boring job for maximum wage" },
                        { id: "7", optionOne: "Work from home forever", optionTwo: "Never work from home again" }
                    ],
                    createdAt: "2024-01-12"
                },
                {
                    id: "4",
                    title: "Food & Lifestyle Choices",
                    questions: [
                        { id: "8", optionOne: "Only eat sweet foods for the rest of your life", optionTwo: "Only eat savory foods for the rest of your life" },
                        { id: "9", optionOne: "Never be able to eat your favorite food again", optionTwo: "Only be able to eat your favorite food" }
                    ],
                    createdAt: "2024-01-20"
                },
                {
                    id: "5",
                    title: "Technology & Future",
                    questions: [
                        { id: "10", optionOne: "Live without internet for a year", optionTwo: "Live without your phone for a year" },
                        { id: "11", optionOne: "Have access to all knowledge", optionTwo: "Have the ability to forget anything you want" }
                    ],
                    createdAt: "2024-01-08"
                },
                {
                    id: "6",
                    title: "Adventure & Travel",
                    questions: [
                        { id: "12", optionOne: "Travel to the past", optionTwo: "Travel to the future" },
                        { id: "13", optionOne: "Explore the deepest ocean", optionTwo: "Explore outer space" }
                    ],
                    createdAt: "2024-01-25"
                }
            ];
            setQuestionSets(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredSets = questionSets.filter(set => {
        if (!searchTerm) return true;
        return set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            set.questions.some(q =>
                q.optionOne.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.optionTwo.toLowerCase().includes(searchTerm.toLowerCase())
            );
    });

    // Sort question sets for different sections
    const mostPopularSets = [...questionSets]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    const latestCreatedSets = [...questionSets]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    const handlePlaySet = (set: QuestionSet) => {
        // In real app, navigate to play mode with this set
        toast.success(`Starting "${set.title}" game mode!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">Loading your questions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: 'rgba(31, 41, 55, 0.9)',
                            color: 'white',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            backdropFilter: 'blur(10px)',
                        },
                    }}
                />

                {/* Hero Section */}
                <HeroSection />

                {/* Search Section */}
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                {/* Search Results */}
                {searchTerm && (
                    <QuestionSection
                        title="Search Results"
                        subtitle={`Found ${filteredSets.length} question sets matching "${searchTerm}"`}
                        icon="🔍"
                        questionSets={filteredSets}
                        onPlay={handlePlaySet}
                    />
                )}

                {/* Most Popular Section */}
                {!searchTerm && (
                    <QuestionSection
                        sectionId="popular-section"
                        title="Most Popular"
                        subtitle="The community's favorite question sets that spark the best conversations"
                        icon="🔥"
                        questionSets={mostPopularSets}
                        onPlay={handlePlaySet}
                    />
                )}

                {/* Latest Created Section */}
                {!searchTerm && (
                    <QuestionSection
                        title="Latest Created"
                        subtitle="Fresh questions just added to our collection"
                        icon="✨"
                        questionSets={latestCreatedSets}
                        onPlay={handlePlaySet}
                    />
                )}

                {/* All Questions Section */}
                {!searchTerm && (
                    <QuestionSection
                        title="All Question Sets"
                        subtitle="Browse through our complete collection of thought-provoking dilemmas"
                        icon="📚"
                        questionSets={questionSets}
                        onPlay={handlePlaySet}
                    />
                )}

                {/* Footer */}
                <footer className="mt-32 py-16 border-t border-gray-800/50">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30">
                                <span className="text-3xl">🤔</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Create Your Own?</h3>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Join 0 users who doesnt know what this website even about.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="text-sm text-gray-500">
                                ©2025 Would You Rather. Made with mohammedpro ❤️ for curious minds.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton />
        </div>
    );
}