import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <div
            className="task-item glass-panel"
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                marginBottom: '0.75rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: task.completed ? 0.7 : 1,
                transform: 'translateY(0)',
                borderLeft: `4px solid ${task.completed ? 'var(--success)' : 'var(--primary)'}`,
            }}
        >
            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    flex: 1,
                }}
            >
                <div style={{ position: 'relative', width: '24px', height: '24px', marginRight: '1rem' }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        style={{
                            appearance: 'none',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: task.completed ? 'var(--success)' : 'var(--border)',
                            background: task.completed ? 'var(--success)' : 'transparent',
                            transition: 'var(--transition)',
                            cursor: 'pointer',
                        }}
                    />
                    {task.completed && (
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) scale(0.6)',
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                            }}
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </div>
                <span
                    style={{
                        fontSize: '1rem',
                        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        transition: 'var(--transition)',
                    }}
                >
                    {task.text}
                </span>
            </label>

            <button
                onClick={() => onDelete(task.id)}
                className="btn-icon"
                aria-label="Delete task"
                style={{
                    marginLeft: '0.5rem',
                    opacity: 0.6,
                    transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = 'var(--danger)';
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>

            <style jsx>{`
        .task-item:hover {
          transform: translateY(-2px) !important;
          box-shadow: var(--shadow-lg);
        }
      `}</style>
        </div>
    );
}
