import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  world: Grid;
  simulationHasStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.world = new Grid(64, 64)
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
}
