export type BingoCell = {
    value: number | 'FREE';
    index: number;
};

export function generateBingoNumbers(): BingoCell[] {
    const colRanges = [
        { min: 1, max: 15 },
        { min: 16, max: 30 },
        { min: 31, max: 45 },
        { min: 46, max: 60 },
        { min: 61, max: 75 },
    ];

    const columns = colRanges.map(range => {
        const nums = new Set<number>();
        while (nums.size < 5) {
            nums.add(Math.floor(Math.random() * (range.max - range.min + 1)) + range.min);
        }
        return Array.from(nums);
    });

    const grid: BingoCell[] = [];
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (row === 2 && col === 2) {
                grid.push({ value: 'FREE', index: 12 });
            } else {
                // columns[col] gives the 5 numbers for that column
                // we take the one at the current 'row' index (0-4)
                grid.push({ value: columns[col][row], index: row * 5 + col });
            }
        }
    }

    return grid;
}

export function checkWin(marked: Set<number>): boolean {
    // Rows
    for (let r = 0; r < 5; r++) {
        if ([0, 1, 2, 3, 4].every(c => marked.has(r * 5 + c))) return true;
    }
    // Cols
    for (let c = 0; c < 5; c++) {
        if ([0, 1, 2, 3, 4].every(r => marked.has(r * 5 + c))) return true;
    }
    // Diagonals
    if ([0, 6, 12, 18, 24].every(i => marked.has(i))) return true;
    if ([4, 8, 12, 16, 20].every(i => marked.has(i))) return true;

    return false;
}
