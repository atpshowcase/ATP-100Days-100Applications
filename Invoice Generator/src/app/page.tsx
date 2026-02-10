'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: LineItem[];
  notes: string;
  taxRate: number;
}

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    senderName: 'Your Company Name',
    senderEmail: 'hello@yourcompany.com',
    senderAddress: '123 Business Ave, Suite 100\nCity, State 12345',
    clientName: 'Client Name',
    clientEmail: 'client@example.com',
    clientAddress: '456 Client St\nCity, State 67890',
    items: [
      { id: '1', description: 'Design Services', quantity: 1, price: 1500 },
      { id: '2', description: 'Development', quantity: 10, price: 100 },
    ],
    notes: 'Thank you for your business!',
    taxRate: 10,
  });

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof InvoiceData) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const calculateSubtotal = () => {
    return data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * data.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.controls}>
        <button onClick={toggleTheme} className={`${styles.actionBtn} ${styles.btnSecondary}`}>
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <button onClick={handlePrint} className={`${styles.actionBtn} ${styles.btnPrimary}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print Invoice
        </button>
      </div>

      <div className={`${styles.invoicePaper} animate-in`}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invoice</h1>
            <div style={{ marginTop: '1rem' }}>
              <input
                className={styles.inputGhost}
                style={{ fontSize: '0.9rem', width: '200px' }}
                value={data.invoiceNumber}
                onChange={(e) => handleChange(e, 'invoiceNumber')}
              />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <textarea
              className={styles.inputGhost}
              style={{ textAlign: 'right', fontWeight: 600 }}
              value={data.senderName}
              onChange={(e) => handleChange(e, 'senderName')}
              rows={1}
            />
            <textarea
              className={styles.inputGhost}
              style={{ textAlign: 'right', fontSize: '0.85rem', color: '#71717a' }}
              value={data.senderAddress}
              onChange={(e) => handleChange(e, 'senderAddress')}
              rows={2}
            />
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div>
            <p className={styles.sectionTitle}>Bill To</p>
            <input
              className={styles.inputGhost}
              style={{ fontWeight: 600, paddingBottom: '0.25rem' }}
              value={data.clientName}
              onChange={(e) => handleChange(e, 'clientName')}
            />
            <textarea
              className={styles.inputGhost}
              style={{ fontSize: '0.9rem', color: '#71717a' }}
              value={data.clientAddress}
              onChange={(e) => handleChange(e, 'clientAddress')}
              rows={2}
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className={styles.sectionTitle}>Details</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>Date:</span>
              <input
                type="date"
                className={styles.inputGhost}
                style={{ width: '130px', textAlign: 'right' }}
                value={data.date}
                onChange={(e) => handleChange(e, 'date')}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>Due Date:</span>
              <input
                type="date"
                className={styles.inputGhost}
                style={{ width: '130px', textAlign: 'right' }}
                value={data.dueDate}
                onChange={(e) => handleChange(e, 'dueDate')}
              />
            </div>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Description</span>
            <span style={{ textAlign: 'right' }}>Qty</span>
            <span style={{ textAlign: 'right' }}>Price</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span></span>
          </div>

          {data.items.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              <input
                className={styles.inputGhost}
                placeholder="Item description..."
                value={item.description}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              />
              <input
                type="number"
                className={styles.inputGhost}
                style={{ textAlign: 'right' }}
                value={item.quantity}
                onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
              />
              <input
                type="number"
                className={styles.inputGhost}
                style={{ textAlign: 'right' }}
                value={item.price}
                onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
              />
              <span style={{ textAlign: 'right', fontWeight: 500 }}>
                ${(item.quantity * item.price).toLocaleString()}
              </span>
              <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                &times;
              </button>
            </div>
          ))}

          <button className={styles.addRowBtn} onClick={addItem}>
            + Add New Item
          </button>
        </div>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span style={{ color: '#71717a' }}>Subtotal</span>
            <span style={{ fontWeight: 500 }}>${calculateSubtotal().toLocaleString()}</span>
          </div>
          <div className={styles.totalRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#71717a' }}>Tax</span>
              <input
                type="number"
                className={styles.inputGhost}
                style={{ width: '40px', fontSize: '0.8rem', textAlign: 'right', borderBottom: '1px dotted var(--border)' }}
                value={data.taxRate}
                onChange={(e) => setData({ ...data, taxRate: parseFloat(e.target.value) || 0 })}
              />
              <span style={{ color: '#71717a', fontSize: '0.8rem' }}>%</span>
            </div>
            <span style={{ fontWeight: 500 }}>${calculateTax().toLocaleString()}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total</span>
            <span>${calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <p className={styles.sectionTitle}>Notes</p>
          <textarea
            className={styles.inputGhost}
            style={{ fontSize: '0.9rem', color: '#71717a', height: '100px' }}
            value={data.notes}
            onChange={(e) => handleChange(e, 'notes')}
            placeholder="Additional notes or payment terms..."
          />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
        }
      `}</style>
    </main>
  );
}
