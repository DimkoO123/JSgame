import { Cell } from "./cell.js";
import { Tile } from "./tile.js";

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

    moveTiles(cells) {
        let moved = false;
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
                    moved = true;
                }
            }
        });
        return moved;
    }

    canMerge() {
        for (let x = 0; x < BOARD_SIZE; x++) {
            for (let y = 0; y < BOARD_SIZE; y++) {
                const currentCell = this.cellsByRow[y][x];
                const rightCell = this.cellsByRow[y][x + 1];
                const bottomCell = this.cellsByColumn[x][y + 1];
                if ((rightCell && rightCell.canAccept(currentCell.tile)) || (bottomCell && bottomCell.canAccept(currentCell.tile))) {
                    return true;
                }
            }
        }
        return false;
    }
}