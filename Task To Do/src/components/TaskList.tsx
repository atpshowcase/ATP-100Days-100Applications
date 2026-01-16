import React, { useState } from 'react';
import { Task, FilterType } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onClearCompleted: () => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onClearCompleted }: TaskListProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const activeCount = tasks.filter(t => !t.completed).length;

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--surface)', padding: '0.25rem', borderRadius: 'var(--radius)' }}>
                    {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                textTransform: 'capitalize',
                                padding: '0.5rem 1rem',
                                borderRadius: 'calc(var(--radius) - 2px)',
                                border: 'none',
                                background: filter === f ? 'var(--primary)' : 'transparent',
                                color: filter === f ? 'white' : 'var(--text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {tasks.some(t => t.completed) && (
                    <button
                        onClick={onClearCompleted}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            textDecoration: 'underline',
                        }}
                    >
                        Clear Completed
                    </button>
                )}
            </div>

            <div style={{ minHeight: '300px' }}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.7
                        }}
                    >
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                marginBottom: '1rem',
                                background: 'var(--surface-hover)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}
                        >
                            {filter === 'completed' ? (
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            ) : (
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            )}
                        </div>
                        <p style={{ fontSize: '1.125rem' }}>
                            {filter === 'completed'
                                ? "No completed tasks yet."
                                : filter === 'active'
                                    ? "No active tasks. You're all caught up!"
                                    : "No tasks found. Add one above!"}
                        </p>
                    </div>
                )}
            </div>

            <div
                style={{
                    marginTop: '2rem',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '1rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <span>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</span>
                <span>Premium Task Manager</span>
            </div>
        </div>
    );
}
