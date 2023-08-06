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
    this.generateWinningDiagnoalCombinations();
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
    this.winningCombinations = this.winningCombinations.concat(combinations);
  }

  generateWinningDiagnoalCombinations() {
    const combinations: Array<Array<number>> = [
      [14,22,30,38], [7,15,23,31], [15,23,31,39], [0,8,16,24], [8,16,24,32], [16,24,32,40],
      [1,9,17,25,33], [9,17,25,33], [17,25,33,41], [2,10,18,26], [10,18,26,34], [3,11,19,27],
      [20,26,32,38], [13,19,25,31], [19,25,31,37], [6,12,18,24], [12,18,24,30], [18,24,30,36],
      [5,11,17,23], [11,17,23,29], [17,23,29,35], [4,10,16,22], [10,16,22,28], [3,9,15,21]
    ]
    this.winningCombinations = this.winningCombinations.concat(combinations);

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

