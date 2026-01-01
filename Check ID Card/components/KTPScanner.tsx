'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractTextWithProgress } from '@/lib/ocr';
import { parseKTPText, cleanKTPData } from '@/lib/ktpParser';
import { KTPData } from '@/types/ktp';

interface KTPScannerProps {
    onDataExtracted: (data: KTPData) => void;
}

export default function KTPScanner({ onDataExtracted }: KTPScannerProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('File must be an image (JPG, PNG, etc)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Maximum file size is 10MB');
            return;
        }

        setError(null);
        setPreview(URL.createObjectURL(file));
        setIsProcessing(true);
        setProgress(0);

        try {
            // Extract text from image
            const text = await extractTextWithProgress(file, (p) => {
                setProgress(Math.round(p * 100));
            });

            console.log('Extracted text:', text);

            // Parse KTP data
            const ktpData = parseKTPText(text);
            const cleanedData = cleanKTPData(ktpData);

            console.log('=== FINAL PARSED DATA ===');
            console.log(cleanedData);
            console.log('========================');

            // Pass data to parent
            onDataExtracted(cleanedData);
            setIsProcessing(false);
        } catch (err) {
            console.error('OCR Error:', err);
            setError('Failed to read text from image. Make sure the ID card photo is clear and not blurry.');
            setIsProcessing(false);
        }
    }, [onDataExtracted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        disabled: isProcessing
    });

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Upload ID Card Photo</h2>

            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input {...getInputProps()} />

                {!preview ? (
                    <div className="space-y-4">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="text-center">
                            <p className="text-lg font-semibold">
                                {isDragActive ? 'Drop file here' : 'Drag & drop ID card photo'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                or click to select file
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                PNG, JPG, JPEG up to 10MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <img
                            src={preview}
                            alt="ID Card Preview"
                            className="max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        {!isProcessing && (
                            <p className="text-sm text-gray-500 text-center">
                                Click or drag new file to replace
                            </p>
                        )}
                    </div>
                )}
            </div>

            {isProcessing && (
                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Processing image...</span>
                        <span className="text-gray-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                        Extracting text from ID card photo...
                    </p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">
                    💡 Tips for best results:
                </h3>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Make sure ID card photo is clear and not blurry</li>
                    <li>• Use good lighting, avoid shadows</li>
                    <li>• Place ID card on a flat surface</li>
                    <li>• Avoid light reflections (glare) on photo</li>
                    <li>• Ensure all text is clearly visible</li>
                </ul>
            </div>
        </div>
    );
}
