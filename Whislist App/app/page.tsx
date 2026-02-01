"use client";

import { useState } from "react";

interface WishItem {
    id: number;
    text: string;
    price?: string;
    link?: string;
    createdAt: string;
}

export default function Home() {
    const [items, setItems] = useState<WishItem[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newItemText, setNewItemText] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [newItemLink, setNewItemLink] = useState("");

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemText.trim()) return;

        const newItem: WishItem = {
            id: Date.now(),
            text: newItemText,
            price: newItemPrice,
            link: newItemLink,
            createdAt: new Date().toLocaleDateString(),
        };

        setItems([newItem, ...items]);
        setNewItemText("");
        setNewItemPrice("");
        setNewItemLink("");
        setIsAdding(false);
    };

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <main className="min-h-screen p-8 md:p-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 z-0" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 mb-2">
                            Wishlist
                        </h1>
                        <p className="text-slate-400 text-lg">Curate your dreams.</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="mt-6 md:mt-0 clean-btn px-6 py-3 rounded-full font-semibold max-w-xs w-full md:w-auto"
                    >
                        {isAdding ? "Cancel" : "+ Add New Wish"}
                    </button>
                </header>

                {isAdding && (
                    <div className="glass-panel p-6 rounded-2xl mb-8 animate-fade-in-down">
                        <h2 className="text-xl font-bold mb-4 text-white">Add a new wish</h2>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Items Name</label>
                                <input
                                    type="text"
                                    value={newItemText}
                                    onChange={(e) => setNewItemText(e.target.value)}
                                    placeholder="e.g. MacBook Pro M3"
                                    className="w-full glass-input px-4 py-3 rounded-xl"
                                    autoFocus
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Estimated Price</label>
                                    <input
                                        type="text"
                                        value={newItemPrice}
                                        onChange={(e) => setNewItemPrice(e.target.value)}
                                        placeholder="e.g. $1999"
                                        className="w-full glass-input px-4 py-3 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Link (Optional)</label>
                                    <input
                                        type="text"
                                        value={newItemLink}
                                        onChange={(e) => setNewItemLink(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full glass-input px-4 py-3 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className="clean-btn px-8 py-3 rounded-xl font-bold w-full md:w-auto"
                                >
                                    Add to List
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {items.length === 0 && !isAdding ? (
                    <div className="text-center py-20 opacity-50">
                        <div className="text-6xl mb-4 float-animation">✨</div>
                        <p className="text-xl">Your wishlist is empty. Start dreaming!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:bg-white/5 transition-colors"
                            >
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {item.text}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                                        {item.price && (
                                            <span className="flex items-center text-emerald-400">
                                                <span className="mr-1">💰</span>
                                                {item.price}
                                            </span>
                                        )}
                                        <span className="flex items-center">
                                            <span className="mr-1">📅</span>
                                            Added {item.createdAt}
                                        </span>
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center"
                                            >
                                                🔗 Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10"
                                    aria-label="Delete"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
