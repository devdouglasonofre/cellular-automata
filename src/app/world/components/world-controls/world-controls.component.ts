import { Component } from '@angular/core';
import { WorldService } from '../../services/world.service';

@Component({
  selector: 'app-world-controls',
  templateUrl: './world-controls.component.html',
  styleUrls: ['./world-controls.component.scss']
})
export class WorldControlsComponent {

  width: number = 64;
  height: number = 64;
  deadHex: string = '#000000';
  aliveHex: string = '#ffffff';


  constructor(readonly worldService: WorldService) { }

  updateTickSpeed(e: Event) {
    const target = e.target as HTMLInputElement;
    this.worldService.setTickSpeed(parseInt(target.value));
    this.worldService.startSimulation();
  }

  updateGridSize() {
    this.worldService.setGridSize(this.width, this.height);
  }

  updatePalette() {
    this.worldService.setPalette(this.deadHex, this.aliveHex);
  }
}
