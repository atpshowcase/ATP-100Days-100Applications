'use client';

import { useState } from 'react';
import { shortenUrlAction } from './actions';

export default function Home() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('url', url);

        try {
            const res = await shortenUrlAction(formData);
            if (res.success && res.shortCode) {
                // Construct full URL based on current location
                const origin = typeof window !== 'undefined' ? window.location.origin : '';
                setResult(`${origin}/${res.shortCode}`);
                setUrl(''); // Clear input on success
            } else {
                setError(res.error || 'Something went wrong');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container">
            <h1 className="title">Shorten Your Links</h1>
            <p className="subtitle">Minimalist, fast, and free URL shortener.</p>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="url"
                            className="input"
                            placeholder="Paste your long URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            aria-label="URL to shorten"
                        />
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? (
                                <span>Shortening...</span>
                            ) : (
                                <span>Shorten</span>
                            )}
                        </button>
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
                </form>

                {result && (
                    <div className="result">
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Your shortened URL:</p>
                        <div className="result-link">
                            <a href={result} target="_blank" rel="noopener noreferrer" className="link-text">
                                {result}
                            </a>
                            <button
                                className="copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(result);
                                    // Optional: Show copied feedback
                                    alert('Copied to clipboard!');
                                }}
                                title="Copy to clipboard"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="footer">
                &copy; {new Date().getFullYear()} Minimalist URL Shortener. All rights reserved.
            </footer>
        </main>
    );
}
