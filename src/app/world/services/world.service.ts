import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { CellState } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  world: Grid;
  simulationHasStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  gridWasUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  tickSpeed: number = 30;

  deadHex: string = '#000000';
  aliveHex: string = '#ffffff';

  constructor() {
    this.world = new Grid(64, 64)
  }

  setGridSize(width: number, height: number) {
    this.world = new Grid(width, height);
    this.gridWasUpdated.next(true);
  }

  setPalette(deadHex: string, aliveHex: string) {
    this.deadHex = deadHex;
    this.aliveHex = aliveHex;
    this.gridWasUpdated.next(true);
  }

  update() {
    this.world.cells?.forEach(row => {
      row.forEach(cell => {
        cell.updateNextState(this.world);
      });
    });

    this.world.cells?.forEach(row => {
      row.forEach(cell => {
        cell.updateCurrentState();
      });
    });
  }

  startSimulation() {
    this.simulationHasStarted.next(true);
  }

  resetStates() {
    this.world = new Grid(64, 64);
    this.simulationHasStarted.next(false);
    this.gridWasUpdated.next(true);
  }

  randomizeStates() {
    this.world.cells?.forEach(row => {
      row.forEach(cell => {
        cell.currentState = Math.random() > 0.5 ? CellState.ALIVE : CellState.DEAD;
      });
    });

    this.gridWasUpdated.next(true);
  }

  step() {
    this.update();
    this.simulationHasStarted.next(false);
    this.gridWasUpdated.next(true);
  }

  setTickSpeed(speed: number) {
    // Mapping slides with steps on 25 to correct FPS
    switch (speed) {
      case 0:
        this.tickSpeed = 12;
        break;
      case 25:
        this.tickSpeed = 24;
        break;
      case 50:
        this.tickSpeed = 30;
        break;
      case 75:
        this.tickSpeed = 60
        break;
      case 100:
        this.tickSpeed = 120;
        break;
      default:
        this.tickSpeed = 12;
        break;
    }
  }
}
