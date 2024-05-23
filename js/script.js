import { Board } from "./board.js";
import { Tile } from "./tile.js";

const gameBoard = document.querySelector("#game-board");

const board = new Board(gameBoard);

board.createBoardElements();

board.getRandomEmptyCell().tile = new Tile(gameBoard);
board.getRandomEmptyCell().tile = new Tile(gameBoard);

eventHandler();

function eventHandler() {
    window.addEventListener("keydown", moveHandler, { once: true });

    // Touch event listeners for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, { once: true });

    window.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        handleTouchMove(touchStartX, touchStartY, touchEndX, touchEndY);
    }, { once: true });
}

function moveHandler(event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        default:
            break;
    }

    board.cells.forEach(cell => cell.mergeTiles());

    board.getRandomEmptyCell().tile = new Tile(gameBoard);
    board.getRandomEmptyCell().tile = new Tile(gameBoard);

    eventHandler();
}

function handleTouchMove(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }

    board.cells.forEach(cell => cell.mergeTiles());

    board.getRandomEmptyCell().tile = new Tile(gameBoard);
    board.getRandomEmptyCell().tile = new Tile(gameBoard);

    eventHandler();
}

function moveUp() {
    return moveTiles(board.cellsByColumn);
}

function moveDown() {
    return moveTiles(board.cellsByColumn.map(column => [...column].reverse()));
}

function moveLeft() {
    return moveTiles(board.cellsByRow);
}

function moveRight() {
    return moveTiles(board.cellsByRow.map(row => [...row].reverse()));
}

function moveTiles(cells) {
    cells.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null) continue;
            let lastValidCell;
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if (!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell;
            }

            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                } else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
    });
}