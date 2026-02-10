'use server';

import { shortenUrl } from '@/lib/db';

export async function shortenUrlAction(formData: FormData) {
    const url = formData.get('url') as string;

    if (!url) {
        return { success: false, error: 'URL is required' };
    }

    try {
        // Basic URL validation
        new URL(url);

        // Check if protocol is present, if not prepend https:// (optional, but good for UX)
        // Actually URL standard requires protocol, so new URL("google.com") fails. 
        // I should let the front-end handle input masking or just enforce valid URL.

    } catch (e) {
        return { success: false, error: 'Invalid URL format' };
    }

    try {
        const shortCode = await shortenUrl(url);
        return { success: true, shortCode: shortCode };
    } catch (error) {
        console.error('Database error:', error);
        return { success: false, error: 'Failed to shorten URL' };
    }
}
