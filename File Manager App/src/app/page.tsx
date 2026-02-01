'use client';

import React, { useEffect, useState } from 'react';

type FileInfo = { name: string; size: number; mtime: string };

export default function Page() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selected, setSelected] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchFiles() {
    const res = await fetch('/api/files');
    if (res.ok) {
      const data = await res.json();
      setFiles(data.files.map((f: any) => ({ name: f.name, size: f.size, mtime: f.mtime })));
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', selected);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (res.ok) {
      setSelected(null);
      fetchFiles();
    } else {
      alert('Upload gagal');
    }
    setLoading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm('Hapus file?')) return;
    const res = await fetch(`/api/files/${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (res.ok) fetchFiles();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">File Manager App</h1>

      <form onSubmit={handleUpload} className="mb-4 flex items-center gap-2">
        <input type="file" onChange={(e) => setSelected(e.target.files?.[0] ?? null)} />
        <button className="btn" disabled={!selected || loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className="bg-white shadow rounded p-4">
        {files.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada file.</p>
        ) : (
          <ul>
            {files.map((f) => (
              <li key={f.name} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-sm text-gray-500">{(f.size / 1024).toFixed(2)} KB — {new Date(f.mtime).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <a className="px-3 py-1 bg-blue-500 text-white rounded" href={`/api/files/${encodeURIComponent(f.name)}`}>
                    Download
                  </a>
                  <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(f.name)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
