import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'url-map.json');

interface UrlMap {
    [key: string]: string;
}

async function getDb(): Promise<UrlMap> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty object
        return {};
    }
}

async function saveDb(db: UrlMap) {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function shortenUrl(originalUrl: string): Promise<string> {
    const db = await getDb();

    // Check if URL already exists to return existing code (optional, but good for cleanliness)
    const existingEntry = Object.entries(db).find(([_, url]) => url === originalUrl);
    if (existingEntry) {
        return existingEntry[0];
    }

    let shortCode = generateShortCode();
    while (db[shortCode]) {
        shortCode = generateShortCode();
    }

    db[shortCode] = originalUrl;
    await saveDb(db);
    return shortCode;
}

export async function getOriginalUrl(shortCode: string): Promise<string | null> {
    const db = await getDb();
    return db[shortCode] || null;
}

function generateShortCode(): string {
    // Simple alphanumeric 6-char code
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
