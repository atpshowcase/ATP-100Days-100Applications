import React from 'react';

interface TileProps {
    value: number;
    row: number;
    col: number;
    isNew?: boolean;
}

const Tile: React.FC<TileProps> = ({ value, row, col, isNew = false }) => {
    if (value === 0) return null;

    // Calculate position: each cell is 106px + 15px gap = 121px
    const x = col * 121;
    const y = row * 121;

    return (
        <div
            className={`tile ${isNew ? 'tile-new' : ''}`}
            data-value={value}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            {value}
        </div>
    );
};

export default Tile;
