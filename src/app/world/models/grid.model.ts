import { Cell, CellState } from "./cell.model";

export class Grid {
    cells: Cell[][] | undefined;
    width: number = 0;
    height: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = [];

        for (let x = 0; x < width; x++) {
            this.cells[x] = [];

            for (let y = 0; y < height; y++) {
                this.cells[x][y] = new Cell(CellState.DEAD, x, y);
            }
        }
    }
}
