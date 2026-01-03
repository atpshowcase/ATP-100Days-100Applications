// Game Constants
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 10;

// Game State
let snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
];
let food = { x: 5, y: 5 };
let direction = 'UP';
let nextDirection = 'UP';
let gameStatus = 'idle'; // idle, playing, paused, gameOver
let score = 0;
let highScore = 0;
let speed = INITIAL_SPEED;
let gameLoop = null;

// DOM Elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// Load high score from localStorage
function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
        highScore = parseInt(saved, 10);
        highScoreEl.textContent = highScore;
    }
}

// Save high score to localStorage
function saveHighScore() {
    localStorage.setItem('snakeHighScore', highScore.toString());
}

// Generate random food position
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

// Check collision with walls or self
function checkCollision(head) {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Move snake
function moveSnake() {
    direction = nextDirection;
    const head = snake[0];
    let newHead;

    switch (direction) {
        case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
        case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
        case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
        case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
    }

    // Check collision
    if (checkCollision(newHead)) {
        endGame();
        return;
    }

    snake.unshift(newHead);

    // Check if food is eaten
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreEl.textContent = score;

        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            saveHighScore();
        }

        food = generateFood();

        // Increase speed every 50 points
        if (score % 50 === 0) {
            speed = Math.max(50, speed - SPEED_INCREMENT);
            restartGameLoop();
        }
    } else {
        snake.pop();
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (subtle)
    ctx.strokeStyle = 'rgba(155, 199, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
        const isHead = index === 0;

        // Snake body gradient
        const gradient = ctx.createRadialGradient(
            segment.x * CELL_SIZE + CELL_SIZE / 2,
            segment.y * CELL_SIZE + CELL_SIZE / 2,
            0,
            segment.x * CELL_SIZE + CELL_SIZE / 2,
            segment.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2
        );

        if (isHead) {
            gradient.addColorStop(0, '#c7f464');
            gradient.addColorStop(1, '#9bc700');
        } else {
            gradient.addColorStop(0, '#9bc700');
            gradient.addColorStop(1, '#6a8a00');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );

        // Add glow effect to head
        if (isHead) {
            ctx.shadowColor = 'rgba(155, 199, 0, 0.8)';
            ctx.shadowBlur = 15;
            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );
            ctx.shadowBlur = 0;
        }

        // Add pixel detail
        ctx.fillStyle = isHead ? '#fff' : 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(
            segment.x * CELL_SIZE + 3,
            segment.y * CELL_SIZE + 3,
            3,
            3
        );
    });

    // Draw food
    const foodGradient = ctx.createRadialGradient(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
    );
    foodGradient.addColorStop(0, '#ff6b6b');
    foodGradient.addColorStop(1, '#ee5a52');

    ctx.fillStyle = foodGradient;
    ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Add highlight to food
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2 - 3,
        food.y * CELL_SIZE + CELL_SIZE / 2 - 3,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Game loop
function gameLoopFunction() {
    moveSnake();
    draw();
}

function startGameLoop() {
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameLoopFunction, speed);
}

function stopGameLoop() {
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
}

function restartGameLoop() {
    stopGameLoop();
    startGameLoop();
}

// Start game
function startGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ];
    direction = 'UP';
    nextDirection = 'UP';
    food = generateFood();
    score = 0;
    speed = INITIAL_SPEED;
    scoreEl.textContent = score;
    gameStatus = 'playing';
    updateUI();
    draw();
    startGameLoop();
}

// Pause/Resume game
function togglePause() {
    if (gameStatus === 'playing') {
        gameStatus = 'paused';
        stopGameLoop();
    } else if (gameStatus === 'paused') {
        gameStatus = 'playing';
        startGameLoop();
    }
    updateUI();
}

// End game
function endGame() {
    gameStatus = 'gameOver';
    stopGameLoop();
    updateUI();
}

// Restart game
function restartGame() {
    stopGameLoop();
    startGame();
}

// Update UI
function updateUI() {
    statusEl.classList.remove('pulse');

    switch (gameStatus) {
        case 'idle':
            statusEl.textContent = 'Press SPACE or click START to begin';
            statusEl.classList.add('pulse');
            statusEl.style.color = 'var(--nokia-green)';
            startBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
            restartBtn.style.display = 'none';
            break;
        case 'playing':
            statusEl.textContent = 'PLAYING - Press SPACE to pause';
            statusEl.style.color = 'var(--nokia-light)';
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            pauseBtn.textContent = 'PAUSE';
            restartBtn.style.display = 'inline-block';
            break;
        case 'paused':
            statusEl.textContent = 'PAUSED - Press SPACE to resume';
            statusEl.classList.add('pulse');
            statusEl.style.color = '#fbbf24';
            pauseBtn.textContent = 'RESUME';
            break;
        case 'gameOver':
            statusEl.textContent = 'GAME OVER!';
            statusEl.classList.add('pulse');
            statusEl.style.color = '#ef4444';
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'none';
            restartBtn.style.display = 'inline-block';
            break;
    }
}

// Change direction
function changeDirection(newDirection) {
    const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
    };

    if (opposites[direction] !== newDirection) {
        nextDirection = newDirection;
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameStatus === 'idle' && e.code === 'Space') {
        e.preventDefault();
        startGame();
        return;
    }

    if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
    }

    if (gameStatus !== 'playing') return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            changeDirection('UP');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            changeDirection('DOWN');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            changeDirection('LEFT');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            changeDirection('RIGHT');
            break;
    }
});

// Button event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', restartGame);

// Initialize
loadHighScore();
draw();
updateUI();
