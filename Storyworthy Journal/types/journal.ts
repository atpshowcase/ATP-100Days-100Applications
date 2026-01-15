export interface JournalEntry {
    id: string;
    date: string; // YYYY-MM-DD format
    sentence: string;
    createdAt: Date;
    updatedAt: Date;
}
