import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function FloatingActionButton() {
    const router = useRouter();
    const t=useTranslations("index.feed")
    return (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
            <Button
                onClick={() => router.push('/create')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-2xl shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 group"
                size="lg"
            >
                <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-20 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {t("create")}

                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>

            <style jsx>{`
                @keyframes bounce-in {
                    0% { 
                        opacity: 0; 
                        transform: scale(0.3) translateY(100px); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.1) translateY(0); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.8s ease-out 1s both;
                }
            `}</style>
        </div>
    );
}