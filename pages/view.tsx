import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { WouldYouRatherQuestion } from "../types";
import { Eye, Play, Trash2, Edit, Search, Filter, Grid, List, ArrowLeft, Star, Clock, Users, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { toast, Toaster } from "sonner";

interface QuestionSet {
    id: string;
    title: string;
    questions: WouldYouRatherQuestion[];
    createdAt: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    category?: string;
    plays?: number;
    rating?: number;
}

export default function ViewQuestions() {
    const router = useRouter();
    const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [previewSet, setPreviewSet] = useState<QuestionSet | null>(null);
    const [previewIndex, setPreviewIndex] = useState(0);

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
                    createdAt: "2024-01-15",
                    difficulty: "easy",
                    category: "Fun",
                    plays: 127,
                    rating: 4.5
                },
                {
                    id: "2",
                    title: "Deep Philosophical Questions",
                    questions: [
                        { id: "4", optionOne: "Know when you will die", optionTwo: "Know how you will die" },
                        { id: "5", optionOne: "Be able to change the past", optionTwo: "Be able to see the future" }
                    ],
                    createdAt: "2024-01-10",
                    difficulty: "hard",
                    category: "Philosophy",
                    plays: 89,
                    rating: 4.8
                },
                {
                    id: "3",
                    title: "Work & Career Dilemmas",
                    questions: [
                        { id: "6", optionOne: "Work your dream job for minimum wage", optionTwo: "Work a boring job for maximum wage" },
                        { id: "7", optionOne: "Work from home forever", optionTwo: "Never work from home again" }
                    ],
                    createdAt: "2024-01-12",
                    difficulty: "medium",
                    category: "Career",
                    plays: 203,
                    rating: 4.2
                }
            ];
            setQuestionSets(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredSets = questionSets.filter(set => {
        const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            set.questions.some(q =>
                q.optionOne.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.optionTwo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesCategory = selectedCategory === "all" || set.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === "all" || set.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const categories = ["all", ...Array.from(new Set(questionSets.map(set => set.category).filter(Boolean)))];

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600';
            case 'medium': return 'text-yellow-600';
            case 'hard': return 'text-red-600';
            default: return 'text-gray-400';
        }
    };

    const handleDeleteSet = (id: string) => {
        setQuestionSets(prev => prev.filter(set => set.id !== id));
        toast.success("Question set deleted successfully!");
    };

    const handlePlaySet = (set: QuestionSet) => {
        // In real app, navigate to play mode with this set
        toast.success(`Starting "${set.title}" game mode!`);
    };

    const handlePreview = (set: QuestionSet) => {
        setPreviewSet(set);
        setPreviewIndex(0);
    };

    // Preview Mode
    if (previewSet) {
        const currentQuestion = previewSet.questions[previewIndex];

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <Toaster />
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">{previewSet.title}</h1>
                        <p className="text-gray-300 mb-8">Preview Mode - See how your questions look in the game</p>

                        <div className="flex items-center justify-center space-x-6 mb-4">
                            <span className="text-lg text-gray-400">
                                Question <span className="text-white font-bold">{previewIndex + 1}</span> of <span className="text-white font-bold">{previewSet.questions.length}</span>
                            </span>
                        </div>
                    </div>

                    {/* Current Question */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl text-white font-medium">
                            Would you rather...
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-blue-600 hover:bg-blue-700 rounded-3xl p-8 h-64 flex items-center justify-center text-center shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105">
                            <div>
                                <div className="text-blue-300 font-bold text-lg mb-4">🪽 OPTION A</div>
                                <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                                    {currentQuestion.optionOne}
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-600 hover:bg-purple-700 rounded-3xl p-8 h-64 flex items-center justify-center text-center shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105">
                            <div>
                                <div className="text-purple-300 font-bold text-lg mb-4">👻 OPTION B</div>
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
                            Previous
                        </Button>
                        <Button
                            onClick={() => setPreviewIndex(prev => Math.min(previewSet.questions.length - 1, prev + 1))}
                            disabled={previewIndex === previewSet.questions.length - 1}
                            variant="outline"
                            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black disabled:opacity-50"
                        >
                            Next
                        </Button>
                        <Button
                            onClick={() => setPreviewSet(null)}
                            className="bg-white text-black hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Library
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">Loading your question library...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Toaster />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Question Library
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Browse and manage all your "Would You Rather" question sets 📚
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-8">
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search questions or titles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex justify-between items-center">
                        <div className="text-gray-300">
                            Showing <span className="text-white font-semibold">{filteredSets.length}</span> question sets
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                onClick={() => setViewMode('grid')}
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black'}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => setViewMode('list')}
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black'}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Question Sets */}
                {filteredSets.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">📚</div>
                        <h3 className="text-2xl font-bold text-white mb-4">No question sets found</h3>
                        <p className="text-gray-400 text-lg mb-8">
                            {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                                ? "Try adjusting your search or filters"
                                : "Create your first question set to get started!"}
                        </p>
                        <Button
                            onClick={() => router.push('/create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                        >
                            Create Question Set
                        </Button>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    }>
                        {filteredSets.map((set) => (
                            <div
                                key={set.id}
                                className={`bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 ${viewMode === 'grid' ? 'p-6' : 'p-4'
                                    }`}
                            >
                                {viewMode === 'grid' ? (
                                    // Grid View
                                    <>
                                        {/* Header */}
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-white line-clamp-2">
                                                    {set.title}
                                                </h3>
                                                <div className="flex items-center space-x-1 text-yellow-400">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-sm">{set.rating}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                <span className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {new Date(set.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    {set.plays} plays
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {set.questions.length} questions
                                                </span>
                                                {set.difficulty && (
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(set.difficulty)}`}>
                                                        {set.difficulty}
                                                    </span>
                                                )}
                                            </div>
                                            {set.category && (
                                                <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm">
                                                    {set.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Sample Questions */}
                                        <div className="mb-6">
                                            <h4 className="text-gray-300 font-semibold mb-3">Sample Questions:</h4>
                                            <div className="space-y-2">
                                                {set.questions.slice(0, 2).map((question, index) => (
                                                    <div key={question.id} className="bg-gray-700/50 rounded-lg p-3">
                                                        <div className="text-sm text-gray-400 mb-1">Question {index + 1}</div>
                                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                                            <div className="bg-blue-900/30 border border-blue-500 rounded p-2">
                                                                <div className="text-blue-300 font-semibold mb-1">A:</div>
                                                                <p className="text-white line-clamp-2">{question.optionOne}</p>
                                                            </div>
                                                            <div className="bg-purple-900/30 border border-purple-500 rounded p-2">
                                                                <div className="text-purple-300 font-semibold mb-1">B:</div>
                                                                <p className="text-white line-clamp-2">{question.optionTwo}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => handlePlaySet(set)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Play
                                            </Button>
                                            <Button
                                                onClick={() => handlePreview(set)}
                                                variant="outline"
                                                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => router.push(`/edit/${set.id}`)}
                                                variant="outline"
                                                className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteSet(set.id)}
                                                variant="outline"
                                                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    // List View
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-2">
                                                <h3 className="text-lg font-bold text-white">{set.title}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-sm">
                                                        {set.questions.length} questions
                                                    </span>
                                                    {set.difficulty && (
                                                        <span className={`px-2 py-1 rounded text-sm ${getDifficultyColor(set.difficulty)}`}>
                                                            {set.difficulty}
                                                        </span>
                                                    )}
                                                    {set.category && (
                                                        <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-sm">
                                                            {set.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                <span className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {new Date(set.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    {set.plays} plays
                                                </span>
                                                <div className="flex items-center space-x-1 text-yellow-400">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span>{set.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => handlePlaySet(set)}
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Play
                                            </Button>
                                            <Button
                                                onClick={() => handlePreview(set)}
                                                variant="outline"
                                                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => router.push(`/edit/${set.id}`)}
                                                variant="outline"
                                                className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteSet(set.id)}
                                                variant="outline"
                                                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="fixed bottom-8 right-8">
                    <Button
                        onClick={() => router.push('/create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-2xl"
                        size="lg"
                    >
                        <Plus className="w-8 h-8" />
                    </Button>
                </div>
            </div>
        </div>
    );
}