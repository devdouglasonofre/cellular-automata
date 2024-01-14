import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WorldService } from '../../services/world.service';
import { CellState } from '../../models/cell.model';

const TILE_SIZE = 4;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor(readonly worldService: WorldService) { }

  ngAfterViewInit() {
    this.canvas!.nativeElement.width = this.worldService.world.width * TILE_SIZE;
    this.canvas!.nativeElement.height = this.worldService.world.height * TILE_SIZE;

    this.updateGrid();

    this.worldService.simulationHasStarted.subscribe(() => {
      if (this.worldService.simulationHasStarted.value) {

        setInterval(() => {
          this.worldService.update();

          this.updateGrid();
        }, 1000 / 2);
      }
    });
  }

  updateGrid() {
    const ctx = this.canvas?.nativeElement.getContext('2d')!;

    this.worldService.world.cells?.forEach(row => {
      row.forEach(cell => {
        if (cell.isAlive) {
          ctx.fillStyle = 'white';
          ctx.fillRect(cell.x * TILE_SIZE, cell.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = 'black';
          ctx.fillRect(cell.x * TILE_SIZE, cell.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      });
    });
  }

  updateCellState(event: MouseEvent) {
    const rect = this.canvas?.nativeElement.getBoundingClientRect();

    // Let's find the boundaries of the cell that was clicked and fill it with white just above and to the left of the mouse click.
    const x = (Math.floor((event.clientX - rect!.left) / TILE_SIZE) * TILE_SIZE) - TILE_SIZE;
    const y = (Math.floor((event.clientY - rect!.top) / TILE_SIZE) * TILE_SIZE) - TILE_SIZE;

    console.log(x / TILE_SIZE, y / TILE_SIZE);

    if (x / TILE_SIZE < 0 || y / TILE_SIZE < 0 || x / TILE_SIZE >= this.worldService.world.cells!.length || y / TILE_SIZE > this.worldService.world.cells![0].length) {
      return;
    }

    if (this.worldService.world.cells![x / TILE_SIZE][y / TILE_SIZE].isAlive) {
      this.worldService.world.cells![x / TILE_SIZE][y / TILE_SIZE].setCurrentState(CellState.DEAD);
    } else {
      this.worldService.world.cells![x / TILE_SIZE][y / TILE_SIZE].setCurrentState(CellState.ALIVE);
    }

    this.updateGrid();
  }

}
