export class Tile {
    #tileElement;
    #x;
    #y;
    #value;

    constructor(tileContainer) {
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        tileContainer.append(this.#tileElement);
        this.value = Math.random() > .5 ? 2 : 4;
    }

    get value() {
        return this.#value;
    }

    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v;
        const strong = Math.log2(v);
        const backgroundLightness = 100 - strong * 9;
        this.#tileElement.style.setProperty("--bg-lightness", `${backgroundLightness}%`);
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(value) {
        this.#x = value;
        this.#tileElement.style.setProperty("--x", value);
    }

    set y(value) {
        this.#y = value;
        this.#tileElement.style.setProperty("--y", value);
    }

    remove() {
        this.#tileElement.remove();
    }
}