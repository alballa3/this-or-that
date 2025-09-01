import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import HeroSection from "@/components/landing/HeroSection";
import SearchSection from "@/components/landing/SearchSection";
import QuestionSection from "@/components/landing/QuestionSection";
import { WouldYouRatherQuestion } from "@/types";
import FloatingActionButton from "@/components/landing/FloatingActionButton";
import { useRouter } from "next/router";

export interface QuestionSet {
    id: string;
    title: string;
    question: WouldYouRatherQuestion[];
    createdAt: string;
}

export default function LandingPage() {
    const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const route = useRouter()
    // Mock data - in real app, this would come from your backend
    useEffect(() => {
        // Simulate loading from API
        const handleLoad = async () => {
            setLoading(true);
            const res = await fetch(`/api/main/view?search=${searchTerm}`);
            const json = await res.json();
            setQuestionSets(json);
            setLoading(false);
        };
        handleLoad()
    }, [searchTerm]);
    console.log(questionSets)
    const filteredSets = questionSets.filter(set => {
        if (!searchTerm) return true;
        return set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            set.question.some(q =>
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
        route.push(`/view/${set.id}`)
    };

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
                {/* {!searchTerm && (
                    <QuestionSection
                        sectionId="popular-section"
                        title="Most Popular"
                        subtitle="The community's favorite question sets that spark the best conversations"
                        icon="🔥"
                        questionSets={mostPopularSets}
                        onPlay={handlePlaySet}
                    />
                )} */}

                {/* Latest Created Section */}
                {!searchTerm && (
                    <QuestionSection
                        title="Latest Created"
                        subtitle="Fresh questions just added to our collection"
                        icon="✨"
                        questionSets={latestCreatedSets}
                        onPlay={handlePlaySet}
                        loading={loading}
                    />
                )}

                {/* All Questions Section
                {!searchTerm && (
                    <QuestionSection
                        title="All Question Sets"
                        subtitle="Browse through our complete collection of thought-provoking dilemmas"
                        icon="📚"
                        questionSets={questionSets}
                        onPlay={handlePlaySet}
                    />
                )} */}

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