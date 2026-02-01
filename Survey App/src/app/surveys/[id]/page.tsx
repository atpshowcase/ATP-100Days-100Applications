'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSurvey, saveResponse } from '@/lib/storage';
import { Survey } from '@/lib/types';
import { ArrowLeft, Check, Send } from 'lucide-react';
import Link from 'next/link';

export default function TakeSurvey() {
    const params = useParams();
    const router = useRouter();
    const surveyId = params?.id as string;

    const [survey, setSurvey] = useState<Survey | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (surveyId) {
            const s = getSurvey(surveyId);
            if (s) setSurvey(s);
        }
    }, [surveyId]);

    const handleAnswer = (questionId: string, value: string | number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        if (!survey) return;

        // Validate required? (Optional for now)

        saveResponse({
            surveyId: survey.id,
            answers,
            submittedAt: Date.now()
        });

        setSubmitted(true);
        setTimeout(() => {
            router.push('/surveys');
        }, 2000);
    };

    if (!survey) {
        return <div className="container py-10 text-center">Loading or not found...</div>;
    }

    if (submitted) {
        return (
            <main className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
                <div className="card text-center" style={{ padding: '3rem', borderColor: 'var(--primary)' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Check size={32} />
                    </div>
                    <h2>Thank You!</h2>
                    <p className="text-muted">Your response has been recorded.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="container" style={{ padding: '2rem 1rem' }}>
            <Link href="/surveys" className="flex-center gap-1 text-muted hover:text-main mb-6" style={{ width: 'fit-content' }}>
                <ArrowLeft size={20} /> Back to Surveys
            </Link>

            <div className="mb-8 text-center">
                <h1 className="mb-2">{survey.title}</h1>
                <p className="text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>{survey.description}</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {survey.questions.map((q, index) => (
                    <div key={q.id} className="card">
                        <label className="label" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                            <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>{index + 1}.</span>
                            {q.text}
                        </label>

                        {q.type === 'text' && (
                            <input
                                className="input"
                                placeholder="Type your answer here..."
                                value={answers[q.id] || ''}
                                onChange={e => handleAnswer(q.id, e.target.value)}
                            />
                        )}

                        {q.type === 'choice' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {q.options?.map((opt, i) => (
                                    <label key={i} className="flex-center gap-2" style={{ justifyContent: 'start', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(128,128,128,0.2)', cursor: 'pointer', background: answers[q.id] === opt ? 'rgba(var(--primary-hue), 10%, 0.1)' : 'transparent', borderColor: answers[q.id] === opt ? 'var(--primary)' : 'rgba(128,128,128,0.2)' }}>
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={opt}
                                            checked={answers[q.id] === opt}
                                            onChange={() => handleAnswer(q.id, opt)}
                                            style={{ accentColor: 'var(--primary)', width: 18, height: 18 }}
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {q.type === 'rating' && (
                            <div className="flex-center gap-2" style={{ justifyContent: 'space-between', padding: '1rem 0' }}>
                                {[1, 2, 3, 4, 5].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => handleAnswer(q.id, val)}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            border: '1px solid',
                                            borderColor: answers[q.id] === val ? 'var(--primary)' : 'rgba(128,128,128,0.3)',
                                            background: answers[q.id] === val ? 'var(--primary)' : 'transparent',
                                            color: answers[q.id] === val ? 'white' : 'var(--text-main)',
                                            fontSize: '1.2rem',
                                            fontWeight: 600,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {val}
                                    </button>
                                ))}
                                <div className="flex-between w-full text-muted text-sm px-2">
                                    <span>Poor</span>
                                    <span>Excellent</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <button className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '1rem', padding: '1rem' }}>
                    Submit Response <Send size={18} className="ml-2" style={{ marginLeft: '0.5rem' }} />
                </button>
            </div>
        </main>
    );
}
