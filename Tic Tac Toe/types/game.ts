export type Player = 'X' | 'O' | null;
export type Board = Player[];

export interface WinnerInfo {
    winner: Player;
    line: number[] | null;
}

export interface GameState {
    board: Board;
    currentPlayer: Player;
    winner: Player;
    winningLine: number[] | null;
    scores: {
        X: number;
        O: number;
        draws: number;
    };
}
