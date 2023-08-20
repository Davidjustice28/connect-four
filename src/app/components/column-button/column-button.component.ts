import { Component, Input, OnInit } from '@angular/core';
import { PositionsService } from 'src/app/services/positions.service';
import { inject } from '@angular/core';
import { GridPosition, PositionUpdate } from 'src/app/_types/grid.types';
import { ColumnPositionService } from 'src/app/services/column-positions.service';
import { Column } from 'src/app/_types/column.types';
import { UsersService } from 'src/app/services/users.service';
import { ComputerDifficultyLevel, GameMode } from 'src/app/_types/game.types';

@Component({
  selector: 'app-column-button',
  template: `<button (click)="handleButtonClick()">{{text}}</button>`,
  styleUrls: ['./column-button.component.css']
})
export class ColumnButtonComponent implements OnInit {
  @Input() text!: string
  positions:GridPosition[] =[]
  columns: Column[] = []
  gameMode:GameMode="1vc"
  computerDifficulty:ComputerDifficultyLevel= "medium"
  lastUsedColumnIndex:number=0
  computersLastUsedColumnIndex:number=0
  theresAWinner:boolean = false
  positionService = inject(PositionsService)
  columnService = inject(ColumnPositionService)
  userService = inject(UsersService)
  whoseTurn!: "player1"|"player2"
  constructor() {
    // this.positionService.getAllPositions();
    this.positionService.positionsSource.subscribe(positions => this.positions = positions)
    this.columns = this.columnService.columns
  }

  ngOnInit(): void {
    this.userService.whoseTurn.subscribe(whoseTurnValue => this.whoseTurn = whoseTurnValue)

  }


  handleTurn(): void {
    let buttonIndex: number = Number(this.text.charAt(1));
    if(this.whoseTurn == "player2" && this.gameMode === "1vc") {
      buttonIndex = this.handlePickingRandomIndexForComputer()
    }
    const column: Column = this.columns[buttonIndex];
    console.log(`${this.whoseTurn}'s turn`)
    let nextPositionAvailableInColumn: number|null = null;
    let bottomPositionIndex:number = column.positions.length - 1;
    for(let n=bottomPositionIndex; n >= 0; n--) {
      const positionIndex = column.positions[n];
      if(!this.positions[positionIndex].used) {
        nextPositionAvailableInColumn = positionIndex;

        const positionUpdateProps: PositionUpdate = {
          used:true,
          playerOccupied: this.whoseTurn 
        }
        const player = this.userService.getPlayers().filter(p => p.player == this.whoseTurn)[0];
        this.userService.addPositionToPlayer(nextPositionAvailableInColumn, this.whoseTurn)
        this.positionService.updatePosition(nextPositionAvailableInColumn, positionUpdateProps);
        const playerWon:boolean = this.positionService.checkIfPlayerWon(player.positions);
        const message:string = `${player.player} ${playerWon ? "won" : "didn't win"}`;
        console.log(message)
        if(this.whoseTurn == "player1") {
          this.lastUsedColumnIndex = buttonIndex;
        } 
        else {
          this.computersLastUsedColumnIndex = buttonIndex
        }
        this.userService.updateWhoseTurnItIs();
        if(playerWon) {
          this.theresAWinner = true
          alert(message)
        } 
        
        break
      }
      else {
        continue
      }
    }

    if(nextPositionAvailableInColumn === null) {
      console.log(`no positions in column ${column.id} available`);
      this.handleTurn()
    }
  }

  handleButtonClickWhenComputerMode() {
    if(this.theresAWinner) {
      console.log("game over. reset game to start over")
    }
    else {
      let timesCalled: number = 0
      this.handleTurn();
      timesCalled++
      if(!this.theresAWinner) {
        setTimeout(() => {
          this.handleTurn()
          timesCalled++
        }, 1000)
      }
      console.log({timesCalled})
  
    }
  }

  handleButtonClick() {
    if(this.gameMode === "1v1") {
      this.handleTurn();
    } 
    else {
      this.handleButtonClickWhenComputerMode();
    }
  }

  handlePickingRandomIndexForComputer(): number {
    const difficultyLevel: ComputerDifficultyLevel = this.computerDifficulty;
    let index:number = 0;
    switch(difficultyLevel) {
      case "easy": 
        index = Math.floor(Math.random() * 7);
        break
      case "medium":
        const leftColumnIndex = (this.lastUsedColumnIndex === 0) ? 1 : (this.lastUsedColumnIndex -1)
        const rightColumnIndex = (this.lastUsedColumnIndex === 6) ? 5 : this.lastUsedColumnIndex + 1;
        const columnNumbers = [this.lastUsedColumnIndex, rightColumnIndex, leftColumnIndex, leftColumnIndex, rightColumnIndex ]
        const randomIndex = Math.floor(Math.random() * 4);
        index = columnNumbers[randomIndex]
        break
    }
    return index
  }
}
