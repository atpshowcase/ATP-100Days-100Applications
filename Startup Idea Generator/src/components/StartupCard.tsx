interface StartupIdea {
    name: string
    tagline: string
    problem: string
    solution: string
    targetMarket: string
    revenueModel: string
    uniqueValue: string
    category: string
}

interface StartupCardProps {
    idea: StartupIdea
    featured?: boolean
}

export function StartupCard({ idea, featured = false }: StartupCardProps) {
    const categoryColors: { [key: string]: string } = {
        'AI & Machine Learning': 'from-purple-500 to-pink-500',
        'FinTech': 'from-green-500 to-emerald-500',
        'HealthTech': 'from-red-500 to-rose-500',
        'EdTech': 'from-blue-500 to-cyan-500',
        'E-commerce': 'from-orange-500 to-amber-500',
        'SaaS': 'from-indigo-500 to-purple-500',
        'GreenTech': 'from-lime-500 to-green-500',
        'FoodTech': 'from-yellow-500 to-orange-500',
        'PropTech': 'from-teal-500 to-cyan-500',
        'Gaming': 'from-fuchsia-500 to-pink-500'
    }

    const gradientClass = categoryColors[idea.category] || 'from-blue-500 to-purple-500'

    return (
        <div className={`
      ${featured ? 'max-w-4xl mx-auto' : 'max-w-md'}
      bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden
      border border-white/20 shadow-2xl
      hover:scale-105 transition-all duration-300
      hover:shadow-purple-500/50
    `}>
            <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`
            ${featured ? 'text-4xl' : 'text-2xl'}
            font-bold text-white
          `}>
                        {idea.name}
                    </h3>
                    <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            bg-gradient-to-r ${gradientClass} text-white
          `}>
                        {idea.category}
                    </span>
                </div>

                <p className={`
          ${featured ? 'text-lg' : 'text-base'}
          text-blue-200 italic mb-6
        `}>
                    "{idea.tagline}"
                </p>

                <div className="space-y-4">
                    <InfoBlock
                        icon="🎯"
                        title="Problem"
                        content={idea.problem}
                        featured={featured}
                    />

                    <InfoBlock
                        icon="💡"
                        title="Solution"
                        content={idea.solution}
                        featured={featured}
                    />

                    <InfoBlock
                        icon="👥"
                        title="Target Market"
                        content={idea.targetMarket}
                        featured={featured}
                    />

                    <InfoBlock
                        icon="💰"
                        title="Revenue Model"
                        content={idea.revenueModel}
                        featured={featured}
                    />

                    <InfoBlock
                        icon="⭐"
                        title="Unique Value"
                        content={idea.uniqueValue}
                        featured={featured}
                    />
                </div>

                {featured && (
                    <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                            Save Idea
                        </button>
                        <button className="flex-1 bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20">
                            Share
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

interface InfoBlockProps {
    icon: string
    title: string
    content: string
    featured?: boolean
}

function InfoBlock({ icon, title, content, featured = false }: InfoBlockProps) {
    return (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-start gap-3">
                <span className={`${featured ? 'text-2xl' : 'text-xl'}`}>{icon}</span>
                <div className="flex-1">
                    <h4 className={`
            ${featured ? 'text-base' : 'text-sm'}
            font-semibold text-purple-300 mb-1
          `}>
                        {title}
                    </h4>
                    <p className={`
            ${featured ? 'text-base' : 'text-sm'}
            text-blue-100
          `}>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
