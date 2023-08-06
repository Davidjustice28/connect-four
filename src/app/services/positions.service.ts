import { Injectable, inject } from '@angular/core';
import { GridPosition, PositionUpdate } from '../_types/grid.types';
import { ColumnPositionService } from './column-positions.service';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  protected positions: GridPosition[] = []
  winningCombinations: Array<Array<number>> = [];
  columnService = inject(ColumnPositionService);
  constructor() {
    this.positions = this.generateInitialPositions()
  }

  resetPositionData(): void {
    this.positions = this.generateInitialPositions();
  }
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

  generateInitialPositions(): GridPosition[] {
    const positions: GridPosition[] = []
    for(let i=0; i<42; i++) {
      const newPosition: GridPosition = {
        index:i,
        playerOccupied: "",
        used:false
      };
      positions.push(newPosition);
    }
    this.generateWinningRowCombinations(); 
    this.generateWinningColumnCombinations();
    return(positions);
  }

  generateWinningRowCombinations() {
    const combinations: Array<Array<number>> = []
    // loop over row
    let initialRowPosition = 0;
    for(let r = 0; r <6; r++) {
      // create positions in combination
      initialRowPosition = (r== 0)? 0 : initialRowPosition + 7;
      // 4 winning combinations each row
      for(let t =0; t < 4; t++){
        const firstNumber = initialRowPosition + t;
        const p1 = firstNumber;
        const p2 = firstNumber + 1;
        const p3 = firstNumber + 2;
        const p4 = firstNumber + 3;
        const combination = [p1,p2,p3,p4];
        combinations.push(combination);
      }
    }
    this.winningCombinations = this.winningCombinations.concat(combinations)
  }

  generateWinningColumnCombinations() {
    const combinations: Array<Array<number>> = []
    // loop over columns
    for(let c=0; c < 7; c++) {
      let initialColumnPositionindex = 5;
      const column = this.columnService.columns[c]
      // 3 winning combinations each column
      for(let t =0; t < 3; t++){
        initialColumnPositionindex = (t == 0)? initialColumnPositionindex : initialColumnPositionindex - 1;
        const p1 = column.positions[initialColumnPositionindex];
        const p2 = column.positions[initialColumnPositionindex - 1];
        const p3 = column.positions[initialColumnPositionindex - 2];
        const p4 = column.positions[initialColumnPositionindex - 3];
        const combination = [p1,p2,p3,p4];
        combinations.push(combination.reverse());
      }
    }
    this.winningCombinations = this.winningCombinations.concat(combinations)
  }
  
  checkIfPlayerWon(positions: Array<number>): boolean {
    let userHasAWinningCombination: boolean = false;
    this.winningCombinations.forEach((combination, index) => {
      const combinationFound = combination.every(positionInCombination => positions.includes(positionInCombination));
      if(combinationFound) {
        console.log("player won")
       userHasAWinningCombination = true; 
      }
    });
    return(userHasAWinningCombination);
  }

}

