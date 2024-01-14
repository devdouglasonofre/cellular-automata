import { Grid } from "./grid.model";

export enum CellState {
    DEAD = 0,
    ALIVE = 1
}

export class Cell {
    currentState: CellState;
    nextState: CellState;
    x: number;
    y: number;

    constructor(currentState: CellState = CellState.DEAD, x: number = 0, y: number = 0) {
        this.currentState = currentState;
        this.nextState = currentState;
        this.x = x;
        this.y = y;
    }

    get isAlive(): boolean {
        return this.currentState === CellState.ALIVE;
    }

    updateNextState(grid: Grid) {
        const aliveNeighbors = this.getAliveNeighbors(grid);

        if (this.isAlive) {
            this.nextState = aliveNeighbors < 2 || aliveNeighbors > 3 ? CellState.DEAD : CellState.ALIVE;
        } else if (aliveNeighbors === 3) {
            this.nextState = CellState.ALIVE;
        }
    }

    private getAliveNeighbors(grid: Grid): number {
        let neighboorsStates: CellState[] = [];

        for (let x = this.x - 1; x <= this.x + 1; x++) {
            if (x < 0 || x >= grid.width) {
                continue;
            }
            for (let y = this.y - 1; y <= this.y + 1; y++) {
                if (y < 0 || y >= grid.height) {
                    continue;
                }
                if (x === this.x && y === this.y) {
                    continue;
                }

                neighboorsStates.push(grid?.cells![x][y].currentState);

            }
        }

        return neighboorsStates.filter(state => state === CellState.ALIVE).length;
    }

    updateCurrentState() {
        this.currentState = this.nextState;
    }

    setCurrentState(state: CellState) {
        this.currentState = state;
    }

}
