// Game types
export type Choice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'lose' | 'draw';

export interface GameState {
    playerChoice: Choice | null;
    computerChoice: Choice | null;
    result: GameResult | null;
    playerScore: number;
    computerScore: number;
}

// Get random computer choice
export const getComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

// Determine winner
export const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    const winConditions: Record<Choice, Choice> = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper',
    };

    return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
};

// Get choice emoji
export const getChoiceEmoji = (choice: Choice): string => {
    const emojis: Record<Choice, string> = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️',
    };
    return emojis[choice];
};

// Get choice display name
export const getChoiceName = (choice: Choice): string => {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
};
