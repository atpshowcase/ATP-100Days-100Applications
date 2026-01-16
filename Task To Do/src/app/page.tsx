"use client";

import React, { useState, useEffect } from 'react';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { Task } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load tasks from local storage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    }
    setMounted(true);
  }, []);

  // Save tasks
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (!mounted) return null;

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="container animate-fade-in">
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--primary)',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            {today}
          </span>
          <h1
            style={{
              fontSize: '3.5rem',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            <span className="gradient-text">Task To Do</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Stay organized and focused with a premium task management experience.
          </p>
        </header>

        <section style={{ maxWidth: '600px', margin: '0 auto' }}>
          <TaskInput onAddTask={addTask} />

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onClearCompleted={clearCompleted}
            />
          </div>
        </section>
      </div>

      {/* Decorative background elements */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'var(--primary)',
          filter: 'blur(150px)',
          opacity: 0.1,
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'var(--secondary)',
          filter: 'blur(150px)',
          opacity: 0.1,
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </main>
  );
}
