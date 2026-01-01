import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(imageFile: File): Promise<string> {
    const worker = await createWorker('ind', 1, {
        logger: (m) => {
            if (m.status === 'recognizing text') {
                console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
        },
    });

    try {
        const { data: { text } } = await worker.recognize(imageFile);
        await worker.terminate();
        return text;
    } catch (error) {
        await worker.terminate();
        throw error;
    }
}

export async function extractTextWithProgress(
    imageFile: File,
    onProgress?: (progress: number) => void
): Promise<string> {
    const worker = await createWorker('ind', 1, {
        logger: (m) => {
            if (m.status === 'recognizing text' && onProgress) {
                onProgress(m.progress);
            }
        },
    });

    try {
        const { data: { text } } = await worker.recognize(imageFile);
        await worker.terminate();
        return text;
    } catch (error) {
        await worker.terminate();
        throw error;
    }
}
