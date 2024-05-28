export class Cell {
    #tile;
    #x;
    #y;
    #mergeTile;

    constructor(boardElement, x, y) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        boardElement.append(cell);
        this.#x = x;
        this.#y = y;
        this.tile = null;
    }

    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(value) {
        this.#tile = value;
        if (value == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }

    get mergeTile() {
        return this.#mergeTile;
    }

    set mergeTile(value) {
        this.#mergeTile = value;
        if (value == null) return
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }

    canAccept(tile) {
        return (this.tile == null || (this.mergeTile == null && this.tile.value === tile.value));
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return 0;
        this.tile.value += this.mergeTile.value;
        const mergedValue = this.tile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
        return mergedValue;
    }
}