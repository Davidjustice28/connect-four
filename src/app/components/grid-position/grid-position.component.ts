import { Component, Input} from '@angular/core';
import {  NgClass } from '@angular/common';
import { PositionPlayer, GridPosition } from '../../_types/grid.types';



@Component({
  selector: 'app-grid-position',
  template:`
  <div class="grid-position" [ngClass]="{player1Occupying: position.playerOccupied == 'player1', player2Occupying: position.playerOccupied == 'player2', notUsed: (!position.used || position.playerOccupied == '')}"></div>
  `,
  styleUrls: ['./grid-position.component.css']
})
export class GridPositionComponent {
  @Input() position!: GridPosition;
}
