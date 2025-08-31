import { Button } from "../ui/button";
import { Plus, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useRouter } from "next/router";

export default function HeroSection() {
    const router = useRouter();

    return (
        <div className="relative text-center mb-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-8 animate-fade-in">
                    <Zap className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-blue-300 text-sm font-medium">The Ultimate Decision Game</span>
                </div>

                {/* Main Title */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6 leading-tight">
                        Would You Rather
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Dive into thought-provoking dilemmas that spark conversations, challenge perspectives, and reveal what truly matters to you and your friends
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-200">
                    <Button
                        onClick={() => router.push('/create')}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                        size="lg"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Questions
                    </Button>
                    <Button
                        onClick={() => document.getElementById('popular-section')?.scrollIntoView({ behavior: 'smooth' })}
                        variant="outline"
                        className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-10 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm bg-purple-500/10 transform hover:scale-105 transition-all duration-300"
                        size="lg"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Explore Questions
                    </Button>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up delay-400">
                    <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">1,247</div>
                        <div className="text-gray-300 font-medium">Questions Created</div>
                        <div className="text-sm text-gray-500 mt-1">+127 this week</div>
                    </div>
                    
                    <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">89</div>
                        <div className="text-gray-300 font-medium">Question Sets</div>
                        <div className="text-sm text-gray-500 mt-1">Curated collections</div>
                    </div>
                    
                    <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-2">15.2K</div>
                        <div className="text-gray-300 font-medium">Games Played</div>
                        <div className="text-sm text-gray-500 mt-1">Active community</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
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
                }
                .delay-200 {
                    animation-delay: 0.2s;
                    animation-fill-mode: both;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    );
}