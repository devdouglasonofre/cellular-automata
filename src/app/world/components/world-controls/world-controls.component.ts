import { Component } from '@angular/core';
import { WorldService } from '../../services/world.service';

@Component({
  selector: 'app-world-controls',
  templateUrl: './world-controls.component.html',
  styleUrls: ['./world-controls.component.scss']
})
export class WorldControlsComponent {

  constructor(readonly worldService: WorldService) { }


  startSimulation() {
    this.worldService.startSimulation();
  }

}
