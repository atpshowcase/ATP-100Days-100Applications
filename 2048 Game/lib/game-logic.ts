export type Grid = number[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export const GRID_SIZE = 4;
export const WIN_TILE = 2048;

// Initialize empty grid
export const initializeGrid = (): Grid => {
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
};

// Add random tile (2 or 4) to empty cell
export const addRandomTile = (grid: Grid): Grid => {
    const emptyCells: [number, number][] = [];

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }

    if (emptyCells.length === 0) return grid;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;

    return newGrid;
};

// Move and merge tiles
const moveRow = (row: number[]): { row: number[], score: number } => {
    // Filter out zeros
    let newRow = row.filter(val => val !== 0);
    let score = 0;

    // Merge adjacent equal tiles
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow[i + 1] = 0;
        }
    }

    // Filter zeros again and pad with zeros
    newRow = newRow.filter(val => val !== 0);
    while (newRow.length < GRID_SIZE) {
        newRow.push(0);
    }

    return { row: newRow, score };
};

// Rotate grid 90 degrees clockwise
const rotateGrid = (grid: Grid): Grid => {
    const newGrid = initializeGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            newGrid[j][GRID_SIZE - 1 - i] = grid[i][j];
        }
    }
    return newGrid;
};

// Move grid in specified direction
export const moveGrid = (grid: Grid, direction: Direction): { grid: Grid, score: number, moved: boolean } => {
    let workingGrid = grid.map(row => [...row]);
    let totalScore = 0;

    // Rotate grid to make all moves equivalent to left move
    if (direction === 'up') {
        workingGrid = rotateGrid(rotateGrid(rotateGrid(workingGrid)));
    } else if (direction === 'right') {
        workingGrid = rotateGrid(rotateGrid(workingGrid));
    } else if (direction === 'down') {
        workingGrid = rotateGrid(workingGrid);
    }

    // Move all rows left
    const newGrid = workingGrid.map(row => {
        const { row: newRow, score } = moveRow(row);
        totalScore += score;
        return newRow;
    });

    // Rotate back
    let finalGrid = newGrid;
    if (direction === 'up') {
        finalGrid = rotateGrid(newGrid);
    } else if (direction === 'right') {
        finalGrid = rotateGrid(rotateGrid(newGrid));
    } else if (direction === 'down') {
        finalGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
    }

    // Check if grid changed
    const moved = JSON.stringify(grid) !== JSON.stringify(finalGrid);

    return { grid: finalGrid, score: totalScore, moved };
};

// Check if game is won
export const isGameWon = (grid: Grid): boolean => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === WIN_TILE) return true;
        }
    }
    return false;
};

// Check if any moves are possible
export const canMove = (grid: Grid): boolean => {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === 0) return true;
        }
    }

    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const current = grid[i][j];
            if (j < GRID_SIZE - 1 && current === grid[i][j + 1]) return true;
            if (i < GRID_SIZE - 1 && current === grid[i + 1][j]) return true;
        }
    }

    return false;
};

// Initialize new game
export const initializeGame = (): Grid => {
    let grid = initializeGrid();
    grid = addRandomTile(grid);
    grid = addRandomTile(grid);
    return grid;
};
