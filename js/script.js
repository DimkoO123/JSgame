import { Board } from "./board.js";
import { Tile } from "./tile.js";

const gameBoard = document.querySelector("#game-board");
const scoreContainer = document.querySelector(".score");
const restartButton = document.querySelector(".restart-button");

let totalScore = 0;
let eventListenersAttached = false;

const board = new Board(gameBoard);

board.createBoardElements();
startGame();

restartButton.addEventListener("click", restartGame);

function startGame() {
    totalScore = 0;
    updateScore(0);
    board.cells.forEach(cell => cell.tile = null);
    addRandomTile();
    addRandomTile();
    if (!eventListenersAttached) {
        eventHandler();
        eventListenersAttached = true;
    }
}

function addRandomTile() {
    const emptyCells = board.emptyCells;
    if (emptyCells.length > 0) {
        emptyCells[Math.floor(Math.random() * emptyCells.length)].tile = new Tile(gameBoard);
    }
}

function eventHandler() {
    window.addEventListener("keydown", moveHandler);

    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        handleTouchMove(touchStartX, touchStartY, touchEndX, touchEndY);
    });
}

function moveHandler(event) {
    let moved = false;
    switch (event.key) {
        case "ArrowUp":
            moved = moveUp();
            break;
        case "ArrowRight":
            moved = moveRight();
            break;
        case "ArrowDown":
            moved = moveDown();
            break;
        case "ArrowLeft":
            moved = moveLeft();
            break;
        default:
            break;
    }

    if (moved) {
        addRandomTile();
        addRandomTile();
        updateGame();
    }
}

function handleTouchMove(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    let moved = false;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moved = moveRight();
        } else {
            moved = moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moved = moveDown();
        } else {
            moved = moveUp();
        }
    }

    if (moved) {
        addRandomTile();
        addRandomTile();
        updateGame();
    }
}

function moveUp() {
    return board.moveTiles(board.cellsByColumn);
}

function moveDown() {
    return board.moveTiles(board.cellsByColumn.map(column => [...column].reverse()));
}

function moveLeft() {
    return board.moveTiles(board.cellsByRow);
}

function moveRight() {
    return board.moveTiles(board.cellsByRow.map(row => [...row].reverse()));
}

function updateGame() {
    board.cells.forEach(cell => {
        const mergedValue = cell.mergeTiles();
        if (mergedValue) {
            totalScore += mergedValue;
            updateScore(totalScore);
        }
    });

    const emptyCells = board.emptyCells;
    if (emptyCells.length === 0 && !board.canMerge()) {
        alert("Game over!");
    }
}

function updateScore(newScore) {
    scoreContainer.textContent = newScore;
}

function restartGame() {
    board.cells.forEach(cell => {
        if (cell.tile) {
            cell.tile.remove();
            cell.tile = null;
        }
        if (cell.mergeTile) {
            cell.mergeTile.remove();
            cell.mergeTile = null;
        }
    });
    totalScore = 0;
    updateScore(totalScore);
    startGame();
}