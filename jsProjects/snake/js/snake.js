import { getInputDirection } from './input.js'

export let SNAKE_SPEED = 2;
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

const levelSelect = document.getElementById('level');
levelSelect.addEventListener('change', () => {
    const level = parseInt(levelSelect.value, 10);
    switch (level) {
        case 1:
            SNAKE_SPEED = 2;
            break;
        case 2:
            SNAKE_SPEED = 4;
            break;
        case 3:
            SNAKE_SPEED = 6;
            break;
    }
    levelSelect.blur();
});

export function update() {
    addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}



export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.style.backgroundImage = "url('./img/snake.png')"; // Set the background image
            snakeElement.style.backgroundSize = 'cover'; // Ensure the image covers the entire element
            snakeElement.classList.add('snake-head'); // Add the snake-head class for additional styling
        }
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}