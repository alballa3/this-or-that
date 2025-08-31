import { Search, Sparkles } from "lucide-react";

interface SearchSectionProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function SearchSection({ searchTerm, onSearchChange }: SearchSectionProps) {
    return (
        <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 mb-20 overflow-hidden animate-slide-up">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30">
                            <Sparkles className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3">
                        Find Your Perfect Questions
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Search through our collection of thought-provoking dilemmas and discover questions that spark amazing conversations
                    </p>
                </div>
                
                <div className="max-w-3xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-blue-400 transition-colors duration-300" />
                            <input
                                type="text"
                                placeholder="Search for questions, topics, or themes..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-lg font-medium shadow-2xl transition-all duration-300 focus:shadow-blue-500/25"
                            />
                        </div>
                    </div>

                    {/* Search Suggestions */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {['Philosophy', 'Career', 'Relationships', 'Technology', 'Adventure', 'Food'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => onSearchChange(tag.toLowerCase())}
                                className="px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-full text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}