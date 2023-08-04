import { Component, inject } from '@angular/core';
import { GridPosition } from '../../_types/grid.types';
import { PositionsService } from '../../services/positions.service';
@Component({
  selector: 'app-gamegrid',
  template: `
  <div id="game-grid">
    <app-grid-position *ngFor="let position of positions" [position]="position"></app-grid-position>
  </div>
  `,
  styleUrls: ['./gamegrid.component.css']
})
export class GamegridComponent {
  positions: GridPosition[] = [];
  positionService = inject(PositionsService)
  constructor() {
    this.positions = this.positionService.getAllPositions();
  }
}

