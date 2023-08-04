import { Component, Input } from '@angular/core';
import { PositionsService } from 'src/app/services/positions.service';
import { inject } from '@angular/core';
import { GridPosition } from 'src/app/_types/grid.types';

@Component({
  selector: 'app-column-button',
  template: `<button>{{text}}</button>`,
  styleUrls: ['./column-button.component.css']
})
export class ColumnButtonComponent {
  @Input() text!: string
  positions:GridPosition[] =[]
  positionService = inject(PositionsService)

  constructor() {
    this.positions = this.positionService.getAllPositions()
  }
}
