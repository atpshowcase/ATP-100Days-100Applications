export default function Header() {
    return (
        <header className="text-center mb-8 animate-float">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 gradient-text">
                Guess the Number
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
                Can you find the secret number between <span className="font-semibold text-purple-400">1</span> and <span className="font-semibold text-purple-400">100</span>?
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="h-1 w-1 bg-purple-400 rounded-full"></div>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </div>
        </header>
    )
}
