"use client";

import { useState } from "react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}

export default function StarRating({
    rating,
    maxRating = 5,
    onRatingChange,
    readonly = false,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        if (!readonly) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(null);
        }
    };

    const handleClick = (index: number) => {
        if (!readonly && onRatingChange) {
            onRatingChange(index);
        }
    };

    const displayedRating = hoverRating !== null ? hoverRating : rating;

    return (
        <div
            style={{
                display: "flex",
                gap: "4px",
                cursor: readonly ? "default" : "pointer",
            }}
            onMouseLeave={handleMouseLeave}
        >
            {[...Array(maxRating)].map((_, i) => {
                const starIndex = i + 1;
                const isFilled = starIndex <= displayedRating;

                return (
                    <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "var(--accent)" : "transparent"}
                        stroke={isFilled ? "var(--accent)" : "var(--muted)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onClick={() => handleClick(starIndex)}
                        style={{
                            transition: "all 0.2s ease",
                            transform: hoverRating === starIndex ? "scale(1.2)" : "scale(1)",
                        }}
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                );
            })}
        </div>
    );
}
