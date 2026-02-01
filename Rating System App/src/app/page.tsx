"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StarRating from "./components/StarRating";

interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number; // The rating value (0-5)
  ratingCount: number; // Simulation of multiple ratings
}

const INITIAL_ITEMS: Item[] = [
  {
    id: "1",
    name: "Interstellar",
    category: "Movie",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 4.8,
    ratingCount: 2304,
  },
  {
    id: "2",
    name: "Visual Studio Code",
    category: "Software",
    description: "Code editing. Redefined. Free. Built on open source. Runs everywhere.",
    rating: 4.9,
    ratingCount: 15420,
  },
  {
    id: "3",
    name: "MacBook Pro M3",
    category: "Hardware",
    description: "Mind-blowing. Head-turning. The most advanced chips ever built for a personal computer.",
    rating: 4.7,
    ratingCount: 89,
  },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "", description: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rateit-items");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_ITEMS);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("rateit-items", JSON.stringify(items));
    }
  }, [items, mounted]);

  const handleRate = (id: string, newRating: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // simple logic: just update the rating to exactly what the user clicked
          // In a real app, this would recalculate average
          return { ...item, rating: newRating };
        }
        return item;
      })
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;

    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      description: newItem.description,
      rating: 0,
      ratingCount: 0,
    };

    setItems([item, ...items]);
    setNewItem({ name: "", category: "", description: "" });
    setIsModalOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>RateIt.</h1>
          <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
            + Add New
          </button>
        </header>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.itemCategory}>{item.category}</span>
                {item.rating > 0 && (
                  <span style={{ color: "var(--accent)", fontWeight: "bold" }}>
                    ★ {item.rating.toFixed(1)}
                  </span>
                )}
              </div>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1rem" }}>
                {item.description}
              </p>

              <div className={styles.ratingSection}>
                <span className={styles.ratingLabel}>Your Rating</span>
                <StarRating
                  rating={item.rating}
                  onRatingChange={(r) => handleRate(item.id, r)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New Item</h2>
            <form onSubmit={addItem}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Arc Browser"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <input
                  className={styles.input}
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="e.g., Software"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                  className={styles.textarea}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
