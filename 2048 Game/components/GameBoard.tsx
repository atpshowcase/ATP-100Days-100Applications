import React from 'react';
import Tile from './Tile';

interface TileData {
    id: number;
    value: number;
    row: number;
    col: number;
    isNew: boolean;
}

interface GameBoardProps {
    tiles: TileData[];
}

const GameBoard: React.FC<GameBoardProps> = ({ tiles }) => {
    return (
        <div className="game-container">
            <div className="grid-background">
                {Array(16).fill(null).map((_, i) => (
                    <div key={i} className="grid-cell"></div>
                ))}
            </div>
            <div className="tiles-container">
                {tiles.map((tile) => (
                    <Tile
                        key={tile.id}
                        value={tile.value}
                        row={tile.row}
                        col={tile.col}
                        isNew={tile.isNew}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
