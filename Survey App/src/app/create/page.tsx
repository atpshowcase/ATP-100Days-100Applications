'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, ArrowLeft, X } from 'lucide-react';
import { saveSurvey } from '@/lib/storage';
import { Question } from '@/lib/types';
import Link from 'next/link';

export default function CreateSurvey() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

    const addQuestion = () => {
        const newQuestion: Question = {
            id: crypto.randomUUID(),
            text: '',
            type: 'text',
            options: []
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addOption = (questionId: string) => {
        const question = questions.find(q => q.id === questionId);
        if (question) {
            const options = question.options || [];
            updateQuestion(questionId, { options: [...options, ''] });
        }
    };

    const updateOption = (questionId: string, index: number, value: string) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.options) {
            const newOptions = [...question.options];
            newOptions[index] = value;
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const removeOption = (questionId: string, index: number) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.options) {
            const newOptions = question.options.filter((_, i) => i !== index);
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const handleSave = () => {
        if (!title) return alert('Please enter a survey title');
        if (questions.length === 0) return alert('Add at least one question');

        const survey = {
            id: crypto.randomUUID(),
            title,
            description,
            questions,
            createdAt: Date.now()
        };

        saveSurvey(survey);
        router.push('/surveys');
    };

    return (
        <main className="container" style={{ padding: '2rem 1rem' }}>
            <div className="flex-between mb-8">
                <Link href="/" className="flex-center gap-1 text-muted hover:text-main">
                    <ArrowLeft size={20} /> Back
                </Link>
                <h2 style={{ margin: 0 }}>Create Survey</h2>
                <div style={{ width: 60 }} /> {/* Spacer */}
            </div>

            <div className="card mb-8">
                <div className="input-group">
                    <label className="label">Survey Title</label>
                    <input
                        className="input"
                        placeholder="e.g., Customer Feedback 2024"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="label">Description</label>
                    <textarea
                        className="input"
                        placeholder="Briefly describe your survey..."
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-8">
                <div className="flex-between mb-4">
                    <h3>Questions</h3>
                    <button className="btn btn-secondary flex-center gap-1" onClick={addQuestion}>
                        <Plus size={18} /> Add Question
                    </button>
                </div>

                {questions.length === 0 && (
                    <div className="text-center" style={{ padding: '4rem', color: 'var(--text-muted)', border: '2px dashed var(--text-muted)', borderRadius: 'var(--radius-md)', opacity: 0.5 }}>
                        No questions yet. Click "Add Question" to start.
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {questions.map((q, index) => (
                        <div key={q.id} className="card" style={{ position: 'relative' }}>
                            <button
                                className="flex-center"
                                style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
                                onClick={() => removeQuestion(q.id)}
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="input-group">
                                <label className="label">Question {index + 1}</label>
                                <input
                                    className="input"
                                    value={q.text}
                                    placeholder="What would you like to ask?"
                                    onChange={e => updateQuestion(q.id, { text: e.target.value })}
                                />
                            </div>

                            <div className="input-group">
                                <label className="label">Type</label>
                                <select
                                    className="input"
                                    value={q.type}
                                    onChange={e => updateQuestion(q.id, { type: e.target.value as any })}
                                >
                                    <option value="text">Short Text</option>
                                    <option value="choice">Multiple Choice</option>
                                    <option value="rating">Rating (1-5)</option>
                                </select>
                            </div>

                            {q.type === 'choice' && (
                                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--primary)' }}>
                                    <label className="label">Options</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {q.options?.map((opt, optIndex) => (
                                            <div key={optIndex} className="flex-center gap-2">
                                                <input
                                                    className="input"
                                                    value={opt}
                                                    placeholder={`Option ${optIndex + 1}`}
                                                    onChange={e => updateOption(q.id, optIndex, e.target.value)}
                                                />
                                                <button onClick={() => removeOption(q.id, optIndex)} style={{ color: 'var(--text-muted)' }}>
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="btn btn-secondary flex-center gap-1"
                                            style={{ alignSelf: 'start', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                            onClick={() => addOption(q.id)}
                                        >
                                            <Plus size={14} /> Add Option
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-center" style={{ paddingBottom: '4rem' }}>
                <button className="btn btn-primary flex-center gap-2" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={handleSave}>
                    <Save size={20} /> Save Survey
                </button>
            </div>
        </main>
    );
}
