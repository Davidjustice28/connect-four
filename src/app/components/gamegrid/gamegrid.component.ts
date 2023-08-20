import { Component, Input, inject } from '@angular/core';
import { GridPosition } from '../../_types/grid.types';
import { PositionsService } from '../../services/positions.service';
import { UsersService } from 'src/app/services/users.service';
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
  @Input() gridPositions!: GridPosition;
  positions: GridPosition[] = [];
  positionService = inject(PositionsService)
  userService = inject(UsersService)
  constructor() {
    // this.positions = this.positionService.getAllPositions();
    this.positionService.positionsSource.subscribe(positions => this.positions = positions)
  }
  
  resetGameGrid() {
    this.positionService.resetPositionData()
    this.userService.resetPlayersPositions()
    // this.positions = this.positionService.getAllPositions()
    console.log("reset grid")
  }
}

