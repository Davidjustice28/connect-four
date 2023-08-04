import { Injectable, OnInit } from '@angular/core';
import { GridPosition, PositionUpdate } from '../_types/grid.types';
import { generateInitialPositions } from '../utils/generateInitialPositions';


@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  protected positions: GridPosition[] = generateInitialPositions()

  getAllPositions(): GridPosition[] {
    return(this.positions);
  }

  updatePosition(index:number, updateProps:PositionUpdate ) {
    let positionToUpdate = this.positions.find(position=> position.index === index);
    if(positionToUpdate) {
      positionToUpdate= {...updateProps, index};
      this.positions.splice(index, 1, positionToUpdate);
    }
  }
}

