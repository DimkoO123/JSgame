import { Cell } from "./cell.js";

const BOARD_SIZE = 4;
const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;

export class Board {
    constructor(boardElement) {
        boardElement.style.setProperty("--board-size", BOARD_SIZE);
        this.cells = [];
        this.boardElement = boardElement;
    }
    createBoardElements() {
        for (let i = 0; i < CELL_COUNT; i++) {
            this.cells.push(
                new Cell(this.boardElement, i % BOARD_SIZE, Math.floor(i / BOARD_SIZE))
            )
        }
    }

    get cellsByColumn() {
        return this.cells.reduce((newCells, cell) => {
            newCells[cell.x] = newCells[cell.x] || [];
            newCells[cell.x][cell.y] = cell;
            return newCells;
        }, []);
    }

    get cellsByRow() {
        return this.cells.reduce((newCells, cell) => {
            newCells[cell.y] = newCells[cell.y] || [];
            newCells[cell.y][cell.x] = cell;
            return newCells;
        }, []);
    }

    get emptyCells() {
        return this.cells.filter(cell => cell.tile == null);
    }

    getRandomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
        return this.emptyCells[randomIndex];
    }
}