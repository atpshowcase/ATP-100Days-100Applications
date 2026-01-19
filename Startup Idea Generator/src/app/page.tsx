'use client'

import { useState } from 'react'
import { StartupCard } from '@/components/StartupCard'
import { GenerateButton } from '@/components/GenerateButton'
import { Header } from '@/components/Header'

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

const categories = [
    'AI & Machine Learning',
    'FinTech',
    'HealthTech',
    'EdTech',
    'E-commerce',
    'SaaS',
    'GreenTech',
    'FoodTech',
    'PropTech',
    'Gaming'
]

const problems = [
    'People struggle to manage their time effectively',
    'Small businesses lack affordable marketing tools',
    'Remote workers feel isolated and disconnected',
    'Consumers want more sustainable shopping options',
    'Students need personalized learning experiences',
    'Freelancers struggle with inconsistent income',
    'Urban dwellers face limited access to fresh food',
    'Pet owners need better healthcare solutions',
    'Travelers want authentic local experiences',
    'Professionals struggle with work-life balance'
]

const solutions = [
    'An AI-powered platform that automates and optimizes',
    'A mobile app that connects and empowers',
    'A marketplace that matches and facilitates',
    'A subscription service that delivers and curates',
    'A community platform that enables and supports',
    'A smart device that monitors and improves',
    'A blockchain-based system that verifies and tracks',
    'An analytics dashboard that predicts and recommends',
    'A virtual assistant that learns and adapts',
    'A gamified experience that motivates and rewards'
]

const markets = [
    'busy professionals aged 25-45',
    'eco-conscious millennials and Gen Z',
    'small business owners with limited budgets',
    'remote workers and digital nomads',
    'health-conscious urban dwellers',
    'tech-savvy early adopters',
    'parents looking for convenience',
    'freelancers and gig economy workers',
    'students and lifelong learners',
    'luxury consumers seeking premium experiences'
]

const revenueModels = [
    'Freemium with premium features at $9.99/month',
    'Subscription tiers from $19-$99/month',
    'Transaction fees of 2-5% per sale',
    'Enterprise licensing starting at $999/month',
    'Advertising revenue with optional ad-free premium',
    'Marketplace commission of 10-15%',
    'Pay-per-use pricing model',
    'White-label solutions for businesses',
    'Data insights and analytics packages',
    'Hybrid model combining subscriptions and transactions'
]

const uniqueValues = [
    'Uses cutting-edge AI to deliver personalized results',
    'First-to-market with proprietary technology',
    'Combines multiple services into one seamless platform',
    'Offers unmatched convenience and time savings',
    'Provides transparent, ethical, and sustainable solutions',
    'Features a vibrant community and social elements',
    'Delivers enterprise-grade features at consumer prices',
    'Guarantees measurable ROI within 90 days',
    'Integrates seamlessly with existing tools and workflows',
    'Backed by industry experts and proven methodology'
]

const prefixes = ['Quick', 'Smart', 'Easy', 'My', 'Get', 'Go', 'Pro', 'Zen', 'Peak', 'Bright']
const suffixes = ['Hub', 'Flow', 'Spot', 'Wave', 'Link', 'Path', 'Nest', 'Sync', 'Verse', 'Sphere']

export default function Home() {
    const [idea, setIdea] = useState<StartupIdea | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [history, setHistory] = useState<StartupIdea[]>([])

    const generateIdea = () => {
        setIsGenerating(true)

        setTimeout(() => {
            const category = categories[Math.floor(Math.random() * categories.length)]
            const problem = problems[Math.floor(Math.random() * problems.length)]
            const solution = solutions[Math.floor(Math.random() * solutions.length)]
            const market = markets[Math.floor(Math.random() * markets.length)]
            const revenue = revenueModels[Math.floor(Math.random() * revenueModels.length)]
            const unique = uniqueValues[Math.floor(Math.random() * uniqueValues.length)]

            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
            const name = `${prefix}${suffix}`

            const taglines = [
                `Revolutionizing ${category.toLowerCase()} for the modern age`,
                `Where innovation meets ${category.toLowerCase()}`,
                `The future of ${category.toLowerCase()} is here`,
                `Empowering ${market} through technology`,
                `Making ${category.toLowerCase()} accessible to everyone`
            ]

            const newIdea: StartupIdea = {
                name,
                tagline: taglines[Math.floor(Math.random() * taglines.length)],
                problem,
                solution,
                targetMarket: market,
                revenueModel: revenue,
                uniqueValue: unique,
                category
            }

            setIdea(newIdea)
            setHistory(prev => [newIdea, ...prev].slice(0, 5))
            setIsGenerating(false)
        }, 1500)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative">
                <Header />

                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
                            Startup Idea Generator
                        </h1>
                        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                            Discover your next billion-dollar idea with AI-powered innovation.
                            Generate unique startup concepts tailored to emerging markets and trends.
                        </p>

                        <GenerateButton onClick={generateIdea} isGenerating={isGenerating} />
                    </div>

                    {idea && (
                        <div className="mb-12 animate-slide-up">
                            <StartupCard idea={idea} featured />
                        </div>
                    )}

                    {history.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                                Recent Ideas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {history.slice(1).map((historyIdea, index) => (
                                    <StartupCard key={index} idea={historyIdea} />
                                ))}
                            </div>
                        </div>
                    )}

                    {!idea && (
                        <div className="text-center text-blue-200 py-20">
                            <div className="text-6xl mb-4">💡</div>
                            <p className="text-xl">Click the button above to generate your first startup idea!</p>
                        </div>
                    )}
                </div>

                <footer className="text-center py-8 text-blue-300">
                    <p>Built with Next.js • Powered by Innovation</p>
                </footer>
            </div>
        </main>
    )
}
