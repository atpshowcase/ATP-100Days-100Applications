'use client';

import { useState } from 'react';

// Generator data
const prefixes = [
  'The', 'Captain', 'Doctor', 'Agent', 'Commander', 'Master', 'Shadow',
  'Iron', 'Storm', 'Dark', 'Silver', 'Golden', 'Crimson', 'Emerald',
  'Phantom', 'Mystic', 'Thunder', 'Cosmic', 'Azure', 'Scarlet'
];

const cores = [
  'Fist', 'Shield', 'Blade', 'Guardian', 'Sentinel', 'Warrior', 'Knight',
  'Phoenix', 'Dragon', 'Wolf', 'Falcon', 'Viper', 'Titan', 'Spectre',
  'Phantom', 'Eclipse', 'Nova', 'Blaze', 'Frost', 'Storm', 'Thunder',
  'Lightning', 'Shadow', 'Spirit', 'Soul', 'Force', 'Mind', 'Heart'
];

const suffixes = [
  '', ' of Justice', ' of Power', ' of Valor', ' of Hope', ' of Light',
  ' of Darkness', ' of Shadows', ' of Infinity', ' of Tomorrow',
  ' of Destiny', ' of Legend', ' of Glory', ' of Victory'
];

const powers = [
  'Super Strength', 'Flight', 'Invisibility', 'Telepathy', 'Telekinesis',
  'Super Speed', 'Energy Manipulation', 'Time Control', 'Regeneration',
  'Shape-shifting', 'Elemental Control', 'Force Fields', 'Teleportation',
  'X-Ray Vision', 'Mind Control', 'Reality Warping', 'Immortality',
  'Weather Control', 'Technopathy', 'Psychic Powers', 'Dimensional Travel'
];

const origins = [
  'Bitten by a radioactive creature',
  'Experiment gone wrong',
  'Born on another planet',
  'Ancient mystical artifact',
  'Genetic mutation',
  'Advanced technology',
  'Cosmic radiation exposure',
  'Secret government program',
  'Inherited from ancestors',
  'Magical transformation',
  'Scientific accident',
  'Alien encounter',
  'Divine intervention',
  'Parallel dimension',
  'Childhood trauma awakening',
  'Military enhancement program'
];

interface SuperheroIdentity {
  name: string;
  power: string;
  origin: string;
}

export default function SuperheroGenerator() {
  const [identity, setIdentity] = useState<SuperheroIdentity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputName, setInputName] = useState('');

  const generateName = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const core = cores[Math.floor(Math.random() * cores.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const power = powers[Math.floor(Math.random() * powers.length)];
      const origin = origins[Math.floor(Math.random() * origins.length)];

      // Generate name based on input or random
      let heroName;
      if (inputName.trim()) {
        // Use input name creatively
        const firstName = inputName.trim().split(' ')[0];
        heroName = `${prefix} ${firstName}${suffix}`;
      } else {
        heroName = `${prefix} ${core}${suffix}`;
      }

      setIdentity({
        name: heroName,
        power: power,
        origin: origin
      });
      
      setIsGenerating(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateName();
    }
  };

  const reset = () => {
    setIdentity(null);
    setInputName('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
          <h1 className="font-playfair text-6xl md:text-7xl font-bold mb-6 tracking-tight text-balance">
            Superhero Name Generator
          </h1>
          <p className="font-archivo text-base tracking-wide text-gray-600 max-w-xl mx-auto">
            Discover your secret identity and unlock your hidden powers
          </p>
        </div>

        {/* Input Section */}
        {!identity && (
          <div className="mb-16 animate-slide-up">
            <label className="block font-archivo text-sm tracking-widest uppercase text-gray-500 mb-4">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your name for a personal touch"
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-black outline-none py-4 text-xl md:text-2xl font-archivo transition-colors duration-300 placeholder:text-gray-400"
            />
          </div>
        )}

        {/* Generate Button */}
        {!identity && (
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={generateName}
              disabled={isGenerating}
              className="group relative px-16 py-6 bg-black text-white font-archivo text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:px-20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isGenerating ? 'Generating...' : 'Generate Identity'}
              </span>
              <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        )}

        {/* Results */}
        {identity && (
          <div className="space-y-12 animate-slide-up">
            {/* Hero Name */}
            <div className="text-center border-t-2 border-b-2 border-black py-12">
              <p className="font-archivo text-xs tracking-widest uppercase text-gray-500 mb-4">
                Your Superhero Identity
              </p>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-balance">
                {identity.name}
              </h2>
            </div>

            {/* Powers & Origin */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Power */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center text-sm">
                    ⚡
                  </div>
                  <h3 className="font-archivo text-xs tracking-widest uppercase text-gray-500">
                    Superpower
                  </h3>
                </div>
                <p className="font-playfair text-2xl font-medium">
                  {identity.power}
                </p>
              </div>

              {/* Origin */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center text-sm">
                    ✦
                  </div>
                  <h3 className="font-archivo text-xs tracking-widest uppercase text-gray-500">
                    Origin Story
                  </h3>
                </div>
                <p className="font-playfair text-2xl font-medium">
                  {identity.origin}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <button
                onClick={generateName}
                className="font-archivo text-sm tracking-widest uppercase text-black hover:text-gray-600 transition-colors underline underline-offset-4 decoration-1"
              >
                Generate New Identity
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={reset}
                className="font-archivo text-sm tracking-widest uppercase text-gray-500 hover:text-black transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block border-t border-gray-200 pt-6">
            <p className="font-archivo text-xs tracking-widest uppercase text-gray-400">
              Built with Next.js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
