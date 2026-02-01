'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSurvey, getResponses } from '@/lib/storage';
import { Survey, Response } from '@/lib/types';
import { ArrowLeft, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function SurveyResults() {
    const params = useParams();
    const surveyId = params?.id as string;

    const [survey, setSurvey] = useState<Survey | null>(null);
    const [responses, setResponses] = useState<Response[]>([]);

    useEffect(() => {
        if (surveyId) {
            const s = getSurvey(surveyId);
            if (s) setSurvey(s);
            setResponses(getResponses(surveyId));
        }
    }, [surveyId]);

    if (!survey) return <div className="container py-10">Loading...</div>;

    return (
        <main className="container" style={{ padding: '2rem 1rem' }}>
            <div className="flex-between mb-8">
                <Link href="/surveys" className="flex-center gap-1 text-muted hover:text-main">
                    <ArrowLeft size={20} /> Back to Surveys
                </Link>
                <div className="text-right">
                    <h2 style={{ margin: 0 }}>{survey.title}</h2>
                    <span className="text-muted">Results Analysis</span>
                </div>
            </div>

            <div className="card mb-8 text-center">
                <div className="flex-center" style={{ flexDirection: 'column', padding: '2rem' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)' }}>{responses.length}</span>
                    <span className="text-muted">Total Responses</span>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {survey.questions.map((q, index) => {
                    const answers = responses.map(r => r.answers[q.id]).filter(a => a !== undefined);

                    return (
                        <div key={q.id} className="card">
                            <h4 className="mb-4">{index + 1}. {q.text}</h4>

                            {q.type === 'text' ? (
                                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                                    {answers.length === 0 ? (
                                        <p className="text-muted">No text responses yet.</p>
                                    ) : (
                                        <ul style={{ listStyle: 'none' }}>
                                            {answers.map((ans, i) => (
                                                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
                                                    {ans}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {/* Distribution for Choice/Rating */}
                                    {(() => {
                                        const counts: Record<string, number> = {};
                                        answers.forEach(a => {
                                            const val = String(a);
                                            counts[val] = (counts[val] || 0) + 1;
                                        });
                                        const total = answers.length;

                                        const keys = q.type === 'rating'
                                            ? ['1', '2', '3', '4', '5']
                                            : (q.options || Object.keys(counts));

                                        return (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {keys.map(key => {
                                                    const count = counts[key] || 0;
                                                    const percent = total > 0 ? (count / total) * 100 : 0;
                                                    return (
                                                        <div key={key}>
                                                            <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                                                                <span>{key}</span>
                                                                <span className="text-muted">{count} ({Math.round(percent)}%)</span>
                                                            </div>
                                                            <div style={{ height: 8, background: 'rgba(128,128,128,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                                                <div style={{ height: '100%', width: `${percent}%`, background: 'var(--primary)', transition: 'width 0.5s ease' }} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
