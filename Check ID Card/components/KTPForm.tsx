'use client';

import { useState, useEffect } from 'react';
import { KTPData, emptyKTPData } from '@/types/ktp';

interface KTPFormProps {
    initialData?: KTPData;
}

export default function KTPForm({ initialData }: KTPFormProps) {
    const [formData, setFormData] = useState<KTPData>(initialData || emptyKTPData);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (initialData) {
            console.log('=== FORM RECEIVED DATA ===');
            console.log(initialData);
            console.log('=========================');
            setFormData(initialData);
            setIsSubmitted(false);
        }
    }, [initialData]);

    const handleChange = (field: keyof KTPData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Here you can add logic to send data to backend
        setTimeout(() => {
            alert('ID card data saved successfully!');
        }, 100);
    };

    const handleReset = () => {
        setFormData(emptyKTPData);
        setIsSubmitted(false);
    };

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">ID Card Data</h2>

            {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ Data saved successfully!
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.nik}
                        onChange={(e) => handleChange('nik', e.target.value)}
                        className="input-field"
                        placeholder="16 digit ID number"
                        maxLength={16}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.nama}
                        onChange={(e) => handleChange('nama', e.target.value)}
                        className="input-field"
                        placeholder="Name as on ID card"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Place of Birth
                        </label>
                        <input
                            type="text"
                            value={formData.tempatLahir}
                            onChange={(e) => handleChange('tempatLahir', e.target.value)}
                            className="input-field"
                            placeholder="Place of birth"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="text"
                            value={formData.tanggalLahir}
                            onChange={(e) => handleChange('tanggalLahir', e.target.value)}
                            className="input-field"
                            placeholder="DD-MM-YYYY"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Gender
                        </label>
                        <select
                            value={formData.jenisKelamin}
                            onChange={(e) => handleChange('jenisKelamin', e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Blood Type
                        </label>
                        <select
                            value={formData.golDarah}
                            onChange={(e) => handleChange('golDarah', e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Address
                    </label>
                    <textarea
                        value={formData.alamat}
                        onChange={(e) => handleChange('alamat', e.target.value)}
                        className="input-field"
                        placeholder="Full address"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Neighborhood/Hamlet
                        </label>
                        <input
                            type="text"
                            value={formData.rtRw}
                            onChange={(e) => handleChange('rtRw', e.target.value)}
                            className="input-field"
                            placeholder="000/000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Village
                        </label>
                        <input
                            type="text"
                            value={formData.kelDesa}
                            onChange={(e) => handleChange('kelDesa', e.target.value)}
                            className="input-field"
                            placeholder="Village name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        District
                    </label>
                    <input
                        type="text"
                        value={formData.kecamatan}
                        onChange={(e) => handleChange('kecamatan', e.target.value)}
                        className="input-field"
                        placeholder="District name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Religion
                        </label>
                        <select
                            value={formData.agama}
                            onChange={(e) => handleChange('agama', e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select</option>
                            <option value="ISLAM">ISLAM</option>
                            <option value="CHRISTIAN">CHRISTIAN</option>
                            <option value="CATHOLIC">CATHOLIC</option>
                            <option value="HINDU">HINDU</option>
                            <option value="BUDDHIST">BUDDHIST</option>
                            <option value="CONFUCIAN">CONFUCIAN</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Marital Status
                        </label>
                        <select
                            value={formData.statusPerkawinan}
                            onChange={(e) => handleChange('statusPerkawinan', e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select</option>
                            <option value="SINGLE">SINGLE</option>
                            <option value="MARRIED">MARRIED</option>
                            <option value="DIVORCED">DIVORCED</option>
                            <option value="WIDOWED">WIDOWED</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Occupation
                    </label>
                    <input
                        type="text"
                        value={formData.pekerjaan}
                        onChange={(e) => handleChange('pekerjaan', e.target.value)}
                        className="input-field"
                        placeholder="Occupation"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Citizenship
                        </label>
                        <input
                            type="text"
                            value={formData.kewarganegaraan}
                            onChange={(e) => handleChange('kewarganegaraan', e.target.value)}
                            className="input-field"
                            placeholder="Citizen/Foreigner"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Valid Until
                        </label>
                        <input
                            type="text"
                            value={formData.berlakuHingga}
                            onChange={(e) => handleChange('berlakuHingga', e.target.value)}
                            className="input-field"
                            placeholder="LIFETIME"
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="btn-primary flex-1"
                    >
                        💾 Save Data
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        🔄 Reset
                    </button>
                </div>
            </form >
        </div >
    );
}
