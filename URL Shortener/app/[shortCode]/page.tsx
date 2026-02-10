import { redirect } from 'next/navigation';
import { getOriginalUrl } from '@/lib/db';

export default async function ShortUrlRedirect({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}) {
    const { shortCode } = await params;
    const originalUrl = await getOriginalUrl(shortCode);

    if (originalUrl) {
        redirect(originalUrl);
    }

    // If not found, show a simple 404 page or redirect home
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            color: '#333'
        }}>
            <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
            <p style={{ fontSize: '1.5rem' }}>Link not found.</p>
            <a href="/" style={{ marginTop: '1rem', color: '#0070f3', textDecoration: 'none' }}>Go back home</a>
        </div>
    );
}
