import React, { useState } from 'react';

interface TaskInputProps {
    onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTask(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '2rem' }}>
            <div
                style={{
                    position: 'relative',
                    transition: 'transform 0.2s ease',
                    transform: isFocused ? 'scale(1.02)' : 'scale(1)',
                }}
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="What needs to be done?"
                    className="input"
                    style={{
                        paddingRight: '3.5rem',
                        height: '3.5rem',
                        fontSize: '1.125rem',
                        background: 'var(--surface)',
                        backdropFilter: 'blur(10px)',
                    }}
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '0.5rem',
                        bottom: '0.5rem',
                        width: '2.5rem',
                        borderRadius: 'var(--radius)',
                        border: 'none',
                        background: text.trim() ? 'var(--primary)' : 'var(--border)',
                        color: 'white',
                        cursor: text.trim() ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'var(--transition)',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
        </form>
    );
}
