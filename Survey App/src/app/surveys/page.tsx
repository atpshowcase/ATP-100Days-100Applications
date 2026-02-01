'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSurveys } from '@/lib/storage';
import { Survey } from '@/lib/types';
import { ArrowRight, BarChart2, Plus, Calendar } from 'lucide-react';

export default function SurveyList() {
    const [surveys, setSurveys] = useState<Survey[]>([]);

    useEffect(() => {
        setSurveys(getSurveys());
    }, []);

    return (
        <main className="container" style={{ padding: '2rem 1rem' }}>
            <div className="flex-between mb-8">
                <h2 style={{ margin: 0 }}>All Surveys</h2>
                <Link href="/create" className="btn btn-primary flex-center gap-1">
                    <Plus size={18} /> New Survey
                </Link>
            </div>

            {surveys.length === 0 ? (
                <div className="card text-center" style={{ padding: '4rem' }}>
                    <p className="text-muted mb-4">You haven't created any surveys yet.</p>
                    <Link href="/create" className="btn btn-secondary">Get Started</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {surveys.map(survey => (
                        <div key={survey.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{survey.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                    {survey.description || 'No description provided.'}
                                </p>
                                <div className="flex-center gap-1" style={{ justifyContent: 'start', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                    <Calendar size={14} />
                                    {new Date(survey.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                <Link href={`/surveys/${survey.id}`} className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                                    Take Survey <ArrowRight size={16} className="ml-2" style={{ marginLeft: '0.5rem' }} />
                                </Link>
                                <Link href={`/surveys/${survey.id}/results`} className="btn btn-secondary" style={{ padding: '0.75rem' }} title="View Results">
                                    <BarChart2 size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
