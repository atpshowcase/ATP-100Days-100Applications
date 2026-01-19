interface GenerateButtonProps {
    onClick: () => void
    isGenerating: boolean
}

export function GenerateButton({ onClick, isGenerating }: GenerateButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isGenerating}
            className="
        relative group
        bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
        text-white font-bold text-lg
        px-12 py-4 rounded-full
        shadow-2xl shadow-purple-500/50
        hover:shadow-purple-500/80
        transform hover:scale-110
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        overflow-hidden
      "
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>

            <span className="relative flex items-center gap-3">
                {isGenerating ? (
                    <>
                        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Magic...
                    </>
                ) : (
                    <>
                        <span className="text-2xl">✨</span>
                        Generate Startup Idea
                    </>
                )}
            </span>
        </button>
    )
}
