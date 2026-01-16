import React from 'react';
import { BingoCell as CellType } from '@/utils/bingoLogic';
import styles from './BingoCell.module.css';

interface BingoCellProps {
    cell: CellType;
    isActive: boolean;
    onClick: (index: number) => void;
}

export const BingoCell: React.FC<BingoCellProps> = ({ cell, isActive, onClick }) => {
    const isFree = cell.value === 'FREE';

    return (
        <div
            className={`glass ${styles.cell} ${isActive ? styles.active : ''} ${isFree ? styles.free : ''}`}
            onClick={() => onClick(cell.index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick(cell.index);
                }
            }}
        >
            {cell.value}
        </div>
    );
};
