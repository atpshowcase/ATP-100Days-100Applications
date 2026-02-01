"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Terminal as TerminalIcon, Play, Code2, Coffee, Cpu, CheckCircle } from 'lucide-react';

// Components for the floating code aesthetic
// Components for the floating code aesthetic
// Components for the floating code aesthetic
const GlowingCode = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="floating-code text-left inline-block pointer-events-none" // pointer-events-none to let clicks pass through to main container
    >
        {children}
    </motion.div>
);

export default function Home() {
    const [currentStep, setCurrentStep] = useState(0);
    const [runComplete, setRunComplete] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const logsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [logs]);

    const handleRun = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop click from triggering next slide
        setLogs([]);
        setRunComplete(false);

        const steps = [
            { text: "INITIALIZING_CONNECTION...", delay: 1000 },
            { text: "SCANNING_FOR_BUTTERFLIES...", delay: 1500 },
            { text: "FOUND: 1,000,000 BUTTERFLIES_IN_STOMACH", delay: 1000 },
            { text: "LOADING_DRIVER: EYE_CONTACT_V2.0...", delay: 1500 },
            { text: "ERROR: SHYNESS_OVERLOAD_DETECTED", delay: 2000 },
            { text: "BYPASSING_SHYNESS_PROTOCOL...", delay: 1500 },
            { text: "SUCCESS: CONFIDENCE_LEVEL_STABILIZING", delay: 1500 },
            { text: "ANALYZING_COMPATIBILITY_SCORE...", delay: 2000 },
            { text: "CALCULATING...", delay: 1000 },
            { text: "CALCULATING...", delay: 1000 },
            { text: "SCORE: INFINITY_AND_BEYOND", delay: 1500 },
            { text: "MOUNTING_VOLUME: /COFFEE_DATES", delay: 1500 },
            { text: "MOUNTING_VOLUME: /LATE_NIGHT_TALKS", delay: 1500 },
            { text: "CHECKING_PROCESS: MISSING_YOU", delay: 1000 },
            { text: "STATUS: PROCESS_ALWAYS_RUNNING", delay: 1500 },
            { text: "COMPILING_SOURCE_CODE: FUTURE_DREAMS", delay: 2000 },
            { text: "LINKING_LIBRARIES: [TRUST, HONESTY, LAUGHTER]", delay: 2000 },
            { text: "OPTIMIZING_HUGS.EXE...", delay: 1500 },
            { text: "DETECTING_BAD_DAYS...", delay: 1000 },
            { text: "AUTO_CUDDLE_ROUTINE_ENABLED", delay: 1500 },
            { text: "UPDATING_FIRMWARE: LISTENING_SKILLS...", delay: 2000 },
            { text: "REMOVING_CACHE: OLD_HEARTBREAKS...", delay: 2000 },
            { text: "CLEANUP_COMPLETE. READY_FOR_NEW_DATA", delay: 1500 },
            { text: "ESTABLISHING_SECURE_CONNECTION...", delay: 2000 },
            { text: "HANDSHAKE_INITIATED...", delay: 1000 },
            { text: "HEARTBEAT_SYNCHRONIZED", delay: 1500 },
            { text: "DOWNLOADING_ASSETS: SHARED_PLAYLISTS...", delay: 2000 },
            { text: "RENDERING_HAPPINESS_HIGH_RES...", delay: 2500 },
            { text: "ENCRYPTING_PROMISES_KEY: 4096BIT", delay: 2000 },
            { text: "SAVING_SNAPSHOT: YOUR_SMILE.PNG", delay: 1500 },
            { text: "DEPLOYING_LOVE_BOMB...", delay: 1000 },
            { text: "3...", delay: 1000 },
            { text: "2...", delay: 1000 },
            { text: "1...", delay: 1000 },
            { text: "DEPLOYMENT_SUCCESSFUL", delay: 1000 },
            { text: "SYSTEM_STATUS: COMPLETELY_IN_LOVE", delay: 2000 }
        ];

        let cumulativeDelay = 0;
        steps.forEach((step) => {
            cumulativeDelay += step.delay;
            setTimeout(() => {
                setLogs(prev => [...prev, `> ${step.text}`]);
            }, cumulativeDelay);
        });

        setTimeout(() => setRunComplete(true), cumulativeDelay + 1000);
    };

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % 29); // Cycle through 29 slides
    };

    const slides = [
        // Slide 0: The SQL Query (Classic)
        <GlowingCode key="hero">
            <span className="syntax-purple">SELECT</span> * <span className="syntax-purple">FROM</span> <span className="syntax-blue">my_life</span><br />
            <span className="syntax-purple">WHERE</span> <span className="syntax-pink">'cause'</span> <span className="syntax-purple">LIKE</span> <span className="syntax-green">'%you%'</span>;<br />
        </GlowingCode>,

        // Slide 1: The Image Snippet (Life.run)
        <GlowingCode key="life-snippet">
            <span className="syntax-purple">try</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-yellow">Life</span>.<span className="syntax-blue">run</span>();<br />
            {'}'} <span className="syntax-purple">catch</span> (<span className="syntax-yellow">Exception</span> <span className="syntax-pink">e</span>) {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-blue">print</span>(<span className="syntax-green">"It's okay"</span>);<br />
            &nbsp;&nbsp;<span className="syntax-comment">// as long as I have you</span><br />
            {'}'}
        </GlowingCode>,

        // Slide 2: Feelings Loop
        <GlowingCode key="feelings">
            <span className="syntax-purple">while</span> (<span className="syntax-pink">world</span>.<span className="syntax-blue">isSpinning</span>()) {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-pink">myLove</span>.<span className="syntax-blue">increment</span>();<br />
            {'}'}
        </GlowingCode>,

        // Slide 3: Dedication
        <GlowingCode key="dedication">
            <span className="syntax-purple">async function</span> <span className="syntax-blue">stayWithMe</span>() {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-purple">await</span> <span className="syntax-blue">forever</span>();<br />
            {'}'}
        </GlowingCode>,

        // Slide 4: Python Logic
        <GlowingCode key="python-logic">
            <span className="syntax-purple">def</span> <span className="syntax-blue">my_happiness</span>(<span className="syntax-pink">you</span>):<br />
            &nbsp;&nbsp;<span className="syntax-purple">if</span> <span className="syntax-pink">you</span>.<span className="syntax-blue">are_here</span>():<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-purple">return</span> <span className="syntax-green">"complete"</span><br />
            &nbsp;&nbsp;<span className="syntax-purple">return</span> <span className="syntax-green">"waiting"</span>
        </GlowingCode>,

        // Slide 5: CSS Styling
        <GlowingCode key="css-style">
            <span className="syntax-yellow">.my-heart</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-blue">display</span>: <span className="syntax-green">flex</span>;<br />
            &nbsp;&nbsp;<span className="syntax-blue">justify-content</span>: <span className="syntax-green">you</span>;<br />
            &nbsp;&nbsp;<span className="syntax-blue">align-items</span>: <span className="syntax-green">forever</span>;<br />
            {'}'}
        </GlowingCode>,

        // Slide 6: React Component
        <GlowingCode key="react-comp">
            <span className="syntax-purple">&lt;Future&gt;</span><br />
            &nbsp;&nbsp;{'{'}<span className="syntax-pink">days</span>.<span className="syntax-blue">map</span>(<span className="syntax-pink">day</span> <span className="syntax-purple">=&gt;</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-purple">&lt;You</span> <span className="syntax-yellow">date</span>={'{'}<span className="syntax-pink">day</span>{'}'} <span className="syntax-purple">/&gt;</span><br />
            &nbsp;&nbsp;)){'}'}<br />
            <span className="syntax-purple">&lt;/Future&gt;</span>
        </GlowingCode>,

        // Slide 7: Git Command
        <GlowingCode key="git-command">
            <span className="syntax-green">$</span> git checkout -b <span className="syntax-blue">our-future</span><br />
            <span className="syntax-comment"># Switched to a new branch 'our-future'</span><br />
            <span className="syntax-green">$</span> git commit -m <span className="syntax-green">"I chose you"</span><br />
            <span className="syntax-green">$</span> git push origin <span className="syntax-pink">heart</span>
        </GlowingCode>,

        // Slide 8: TypeScript Interface
        <GlowingCode key="ts-interface">
            <span className="syntax-purple">interface</span> <span className="syntax-yellow">Soulmate</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-pink">name</span>: <span className="syntax-green">"You"</span>;<br />
            &nbsp;&nbsp;<span className="syntax-pink">forever</span>: <span className="syntax-blue">true</span>;<br />
            {'}'}
        </GlowingCode>,

        // Slide 9: Dockerfile
        <GlowingCode key="docker">
            <span className="syntax-purple">FROM</span> <span className="syntax-green">perfect-match:latest</span><br />
            <span className="syntax-purple">COPY</span> <span className="syntax-blue">./my-heart</span> <span className="syntax-green">/yours</span><br />
            <span className="syntax-purple">CMD</span> [<span className="syntax-green">"love"</span>, <span className="syntax-green">"forever"</span>]
        </GlowingCode>,

        // Slide 10: NPM Install
        <GlowingCode key="npm">
            <span className="syntax-comment"># Installing dependency...</span><br />
            <span className="syntax-green">npm</span> install <span className="syntax-blue">happiness</span> <span className="syntax-pink">--save-dev</span><br />
            <span className="syntax-comment">// Found 1 package: You</span>
        </GlowingCode>,

        // Slide 11: C++ Pointer
        <GlowingCode key="cpp">
            <span className="syntax-purple">while</span>(*<span className="syntax-pink">time</span>) {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-yellow">Love</span>* <span className="syntax-pink">u</span> = &<span className="syntax-blue">me</span>;<br />
            &nbsp;&nbsp;<span className="syntax-comment">// Address of me is you</span><br />
            {'}'}
        </GlowingCode>,

        // Slide 12: Regex Match
        <GlowingCode key="regex">
            <span className="syntax-purple">const</span> <span className="syntax-blue">myType</span> = <span className="syntax-green">"You are my type"</span>;<br />
            <span className="syntax-purple">if</span> (<span className="syntax-pink">/you/i</span>.<span className="syntax-blue">test</span>(<span className="syntax-blue">myType</span>)) {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-yellow">console</span>.<span className="syntax-blue">log</span>(<span className="syntax-green">"Match Found"</span>);<br />
            {'}'}
        </GlowingCode>,

        // Slide 13: Digital Logic
        <GlowingCode key="logic">
            <span className="syntax-purple">INPUT</span>: <span className="syntax-pink">You</span>;<br />
            <span className="syntax-purple">OUTPUT</span>: <span className="syntax-pink">Love</span>;<br />
            <span className="syntax-blue">ALWAYS</span> @(<span className="syntax-pink">You</span>) <span className="syntax-purple">BEGIN</span><br />
            &nbsp;&nbsp;<span className="syntax-pink">Love</span> &lt;= <span className="syntax-green">1'b1</span>;<br />
            <span className="syntax-purple">END</span>
        </GlowingCode>,

        // Slide 14: JSON Config
        <GlowingCode key="json">
            {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-pink">"id"</span>: <span className="syntax-green">1</span>,<br />
            &nbsp;&nbsp;<span className="syntax-pink">"status"</span>: <span className="syntax-green">"In Love"</span>,<br />
            &nbsp;&nbsp;<span className="syntax-pink">"with"</span>: <span className="syntax-green">"You"</span><br />
            {'}'}
        </GlowingCode>,

        // Slide 15: HTML Meta
        <GlowingCode key="html">
            <span className="syntax-purple">&lt;meta</span> <span className="syntax-yellow">name</span>=<span className="syntax-green">"owner"</span><br />
            &nbsp;&nbsp;<span className="syntax-yellow">content</span>=<span className="syntax-green">"You"</span> <span className="syntax-purple">/&gt;</span><br />
            <span className="syntax-purple">&lt;title&gt;</span><span className="syntax-pink">Our Story</span><span className="syntax-purple">&lt;/title&gt;</span>
        </GlowingCode>,

        // Slide 16: Rust Main
        <GlowingCode key="rust">
            <span className="syntax-purple">fn</span> <span className="syntax-blue">main</span>() {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-purple">let</span> <span className="syntax-pink">us</span> = <span className="syntax-green">"Unbreakable"</span>;<br />
            &nbsp;&nbsp;<span className="syntax-yellow">println!</span>(<span className="syntax-green">"{ }"</span>, <span className="syntax-pink">us</span>);<br />
            {'}'}
        </GlowingCode>,

        // Slide 17: Array Reduce
        <GlowingCode key="reduce">
            <span className="syntax-purple">const</span> <span className="syntax-blue">life</span> = [<span className="syntax-pink">days</span>, <span className="syntax-pink">nights</span>];<br />
            <span className="syntax-blue">life</span>.<span className="syntax-blue">reduce</span>((<span className="syntax-pink">acc</span>, <span className="syntax-pink">curr</span>) <span className="syntax-purple">=&gt;</span><br />
            &nbsp;&nbsp;<span className="syntax-pink">acc</span> + <span className="syntax-pink">you</span>, <span className="syntax-green">""</span><br />
            );
        </GlowingCode>,

        // Slide 18: Env Variables
        <GlowingCode key="env">
            <span className="syntax-pink">HEART_PORT</span>=<span className="syntax-blue">3000</span><br />
            <span className="syntax-pink">DB_USER</span>=<span className="syntax-green">you</span><br />
            <span className="syntax-pink">DB_PASS</span>=<span className="syntax-green">forever123</span><br />
            <span className="syntax-pink">ACCESS_LEVEL</span>=<span className="syntax-purple">ADMIN</span>
        </GlowingCode>,

        // Slide 19: Golang
        <GlowingCode key="go">
            <span className="syntax-purple">package</span> <span className="syntax-blue">love</span><br />
            <span className="syntax-purple">func</span> <span className="syntax-blue">Init</span>() <span className="syntax-purple">string</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-purple">return</span> <span className="syntax-green">"You are the one"</span><br />
            {'}'}
        </GlowingCode>,

        // Slide 20: Ruby Class
        <GlowingCode key="ruby">
            <span className="syntax-purple">class</span> <span className="syntax-yellow">Destiny</span><br />
            &nbsp;&nbsp;<span className="syntax-purple">def</span> <span className="syntax-blue">initialize</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-pink">@partner</span> = <span className="syntax-green">"You"</span><br />
            &nbsp;&nbsp;<span className="syntax-purple">end</span><br />
            <span className="syntax-purple">end</span>
        </GlowingCode>,

        // Slide 21: Linux Sudo
        <GlowingCode key="sudo">
            <span className="syntax-green">user@heart:~$</span> sudo mv /universe<br />
            <span className="syntax-blue">/your-arms</span><br />
            <span className="syntax-comment"># Moved successfully.</span>
        </GlowingCode>,

        // Slide 22: Markdown List
        <GlowingCode key="markdown">
            <span className="syntax-purple"># My Priority</span><br />
            - [x] <span className="syntax-pink">Love You</span><br />
            - [x] <span className="syntax-pink">Hug You</span><br />
            - [ ] <span className="syntax-comment">Stop (Impossible)</span>
        </GlowingCode>,

        // Slide 23: Swift Optional
        <GlowingCode key="swift">
            <span className="syntax-purple">var</span> <span className="syntax-pink">love</span>: <span className="syntax-yellow">String</span>? = <span className="syntax-green">"You"</span><br />
            <span className="syntax-purple">if let</span> <span className="syntax-pink">u</span> = <span className="syntax-pink">love</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-blue">print</span>(<span className="syntax-green">"Found \(u)"</span>)<br />
            {'}'}
        </GlowingCode>,

        // Slide 24: PHP Session
        <GlowingCode key="php">
            <span className="syntax-purple">&lt;?php</span><br />
            <span className="syntax-pink">$heart</span> = <span className="syntax-purple">new</span> <span className="syntax-yellow">Database</span>();<br />
            <span className="syntax-pink">$heart</span><span className="syntax-purple">-&gt;</span><span className="syntax-blue">connect</span>(<span className="syntax-green">"You"</span>);<br />
            <span className="syntax-comment">// Connected successfully</span>
        </GlowingCode>,

        // Slide 25: Lisp/Clojure
        <GlowingCode key="lisp">
            (<span className="syntax-purple">defun</span> <span className="syntax-blue">love</span> (<span className="syntax-pink">target</span>)<br />
            &nbsp;&nbsp;(<span className="syntax-purple">cond</span> ((<span className="syntax-blue">eq</span> <span className="syntax-pink">target</span> 'you) <span className="syntax-green">'eternal</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span className="syntax-blue">t</span> <span className="syntax-green">'nil</span>)))<br />
        </GlowingCode>,

        // Slide 26: GraphQL Query
        <GlowingCode key="graphql">
            <span className="syntax-purple">query</span> {'{'}<br />
            &nbsp;&nbsp;<span className="syntax-blue">future</span> {'{'}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-pink">weddingDates</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-pink">babyNames</span><br />
            &nbsp;&nbsp;{'}'}<br />
            {'}'}
        </GlowingCode>,

        // Slide 27: ES6 Import
        <GlowingCode key="es6-import">
            <span className="syntax-purple">import</span> {'{'} <span className="syntax-yellow">Happiness</span> {'}'} <span className="syntax-purple">from</span> <span className="syntax-green">'./you'</span>;<br />
            <span className="syntax-purple">export default</span> <span className="syntax-yellow">Happiness</span>;
        </GlowingCode>,

        // Slide 4: Runtime Execution
        <motion.div
            key="runtime"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center w-full max-w-xl p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()} // Stop propagation from the card itself to prevent accidental next slide when interacting with terminal
        >
            <div className="flex gap-2 mb-6 w-full opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="space-y-3 h-[300px] overflow-y-auto w-full text-left font-mono scrollbar-hide">
                {logs.length === 0 && !runComplete && (
                    <div className="text-gray-400 animate-pulse text-center pt-20 tracking-widest text-sm">
                        [ TAP TO START ]
                    </div>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="text-[var(--primary)] text-sm font-medium">
                        {log}
                    </div>
                ))}
                <div ref={logsEndRef} />
            </div>

            <div className="mt-8 pt-4 w-full flex justify-center border-t border-white/5">
                {!runComplete ? (
                    <button
                        onClick={handleRun}
                        className="px-8 py-3 bg-[var(--primary)] text-black rounded hover:bg-[var(--accent)] transition-all font-bold tracking-widest shadow-[0_0_20px_rgba(0,255,157,0.4)]"
                    >
                        EXECUTE PROGRAM
                    </button>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="text-white text-lg font-light mb-2 glow-text">
                            Process Completed.
                        </div>
                        <div className="text-[var(--secondary)] text-3xl font-bold neon-text">
                            I'm Yours.
                        </div>
                        <div className="flex justify-center mt-6">
                            <Heart size={48} className="text-pink-500 animate-bounce" fill="currentColor" />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    ];

    return (
        <main
            className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer"
            onClick={nextStep}
        >

            {/* Centered Content Area */}
            <div className="z-10 text-center w-full px-4">
                <AnimatePresence mode="wait">
                    {slides[currentStep]}
                </AnimatePresence>
            </div>

            {/* Progress Dots - Minimalist */}
            <div className="absolute bottom-10 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentStep
                            ? 'bg-white scale-125 shadow-[0_0_10px_white]'
                            : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>
        </main>
    );
}
