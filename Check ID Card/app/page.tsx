'use client';

import { useState } from 'react';
import KTPScanner from '@/components/KTPScanner';
import KTPForm from '@/components/KTPForm';
import { KTPData, emptyKTPData } from '@/types/ktp';

export default function Home() {
    const [ktpData, setKtpData] = useState<KTPData>(emptyKTPData);

    const handleDataExtracted = (data: KTPData) => {
        console.log('=== PARENT COMPONENT RECEIVED DATA ===');
        console.log(data);
        console.log('Setting ktpData state...');
        setKtpData(data);
        console.log('======================================');
    };

    return (
        <main className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        📸 ID Card Scanner
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Upload your ID card photo and let OCR technology auto-fill the form
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>100% Privacy Protected - Processed in Your Browser</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Scanner */}
                    <div>
                        <KTPScanner onDataExtracted={handleDataExtracted} />
                    </div>

                    {/* Right Column - Form */}
                    <div>
                        <KTPForm initialData={ktpData} />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center text-white/80 text-sm">
                    <p className="mb-2">
                        This application uses OCR (Optical Character Recognition) technology to read text from ID card photos
                    </p>
                    <p>
                        Your data is processed entirely in your browser and is not sent to any server
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl mb-3">🔒</div>
                        <h3 className="font-semibold mb-2">Safe & Private</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            All processing is done in your browser, data is not stored on any server
                        </p>
                    </div>

                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="font-semibold mb-2">Fast & Accurate</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Modern OCR technology for fast and accurate data extraction
                        </p>
                    </div>

                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl mb-3">✏️</div>
                        <h3 className="font-semibold mb-2">Editable</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            OCR results can be manually edited to ensure data accuracy
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
