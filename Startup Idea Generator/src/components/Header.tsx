export function Header() {
    return (
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50">
                            🚀
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">StartupGen</h1>
                            <p className="text-xs text-blue-300">Innovation at Your Fingertips</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 font-medium">
                            Home
                        </a>
                        <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 font-medium">
                            Saved Ideas
                        </a>
                        <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 font-medium">
                            About
                        </a>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200">
                            Sign In
                        </button>
                    </nav>

                    <button className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
