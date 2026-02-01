import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] overflow-hidden selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10 w-full">
        <div className="text-center mb-12 space-y-4 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)] pb-2">
            Cinema<span className="text-purple-500">Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Experience your local videos in stunning quality with our premium, privacy-focused player.
          </p>
        </div>

        <VideoPlayer />

        <footer className="mt-20 text-gray-500 text-sm font-light">
          <p>© {new Date().getFullYear()} CinemaPro. Built for excellence.</p>
        </footer>
      </div>
    </main>
  );
}
