"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Eye, EyeOff, Copy } from "lucide-react";

interface PasswordEntry {
    id: string;
    service: string;
    username: string;
    password: string; // Wait, actually storing plain passwords locally is risky but fine for a demo.
    category?: string;
}

export default function PasswordManager() {
    const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [newService, setNewService] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("passwords");
        if (saved) {
            setPasswords(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(passwords));
    }, [passwords]);

    const addPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newService || !newPassword) return;

        const newEntry: PasswordEntry = {
            id: crypto.randomUUID(),
            service: newService,
            username: newUsername,
            password: newPassword,
        };

        setPasswords([newEntry, ...passwords]);
        setNewService("");
        setNewUsername("");
        setNewPassword("");
        setShowForm(false);
    };

    const deletePassword = (id: string) => {
        setPasswords(passwords.filter((p) => p.id !== id));
    };

    const filteredPasswords = passwords.filter((p) =>
        p.service.toLowerCase().includes(search.toLowerCase()) ||
        p.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: "2rem" }}>
                <div className="input-group" style={{ marginBottom: 0, flex: 1, marginRight: "1rem" }}>
                    <div style={{ position: "relative" }}>
                        <Search
                            size={18}
                            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ paddingLeft: "2.5rem" }}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus size={18} style={{ marginRight: "0.5rem" }} /> New
                </button>
            </div>

            {showForm && (
                <form onSubmit={addPassword} className="card" style={{ marginBottom: "2rem", animation: "fadeIn 0.2s ease" }}>
                    <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Add New Password</h3>
                    <div className="input-group">
                        <label className="label">Service Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Netflix, Gmail"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Username / Email</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="user@example.com"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="label">Password</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex-between" style={{ justifyContent: "flex-end", gap: "1rem" }}>
                        <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Password</button>
                    </div>
                </form>
            )}

            <div style={{ display: "grid", gap: "1rem" }}>
                {filteredPasswords.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>
                        <p>No passwords found. Add one to get started.</p>
                    </div>
                ) : (
                    filteredPasswords.map((entry) => (
                        <PasswordCard key={entry.id} entry={entry} onDelete={deletePassword} />
                    ))
                )}
            </div>
        </div>
    );
}

function PasswordCard({ entry, onDelete }: { entry: PasswordEntry; onDelete: (id: string) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.25rem" }}>{entry.service}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{entry.username}</div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                        fontFamily: "monospace",
                        background: "var(--input)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.9rem",
                        minWidth: "120px"
                    }}>
                        {showPassword ? entry.password : "••••••••••••"}
                    </div>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide" : "Show"}
                        style={{ padding: "0.25rem" }}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={() => copyToClipboard(entry.password)}
                        title="Copy Password"
                        style={{ padding: "0.25rem", color: copied ? "var(--accent)" : "inherit" }}
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>

            <div>
                <button
                    className="btn btn-ghost"
                    onClick={() => onDelete(entry.id)}
                    title="Delete"
                    style={{ color: "var(--muted)" }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
