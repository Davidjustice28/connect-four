import { Component, Input, OnInit } from '@angular/core';
import { PositionsService } from 'src/app/services/positions.service';
import { inject } from '@angular/core';
import { GridPosition, PositionUpdate } from 'src/app/_types/grid.types';
import { ColumnPositionService } from 'src/app/services/column-positions.service';
import { Column } from 'src/app/_types/column.types';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-column-button',
  template: `<button (click)="handleButtonClick()">{{text}}</button>`,
  styleUrls: ['./column-button.component.css']
})
export class ColumnButtonComponent implements OnInit {
  @Input() text!: string
  positions:GridPosition[] =[]
  columns: Column[] = []
  theresAWinner:boolean = false
  positionService = inject(PositionsService)
  columnService = inject(ColumnPositionService)
  userService = inject(UsersService)
  whoseTurn!: "player1"|"player2"
  constructor() {
    this.positions = this.positionService.getAllPositions();
    this.columns = this.columnService.columns
  }

  ngOnInit(): void {
    this.userService.whoseTurn.subscribe(whoseTurnValue => this.whoseTurn = whoseTurnValue)

  }


  handleClick(): void {
    let buttonIndex: number = Number(this.text.charAt(1));
    if(this.whoseTurn == "player2") {
      const randomIndex = Math.floor(Math.random() * 7);
      buttonIndex = randomIndex;
    }
    const column: Column = this.columns[buttonIndex];
    //console.log({columnIndex: buttonIndex, columnPositions: column.positions});
    console.log(`${this.whoseTurn}'s turn`)
    let nextPositionAvailableInColumn: number|null = null;
    let bottomPositionIndex:number = column.positions.length - 1;
    for(let n=bottomPositionIndex; n >= 0; n--) {
      const positionIndex = column.positions[n];
      if(!this.positions[positionIndex].used) {
        nextPositionAvailableInColumn = positionIndex;
        // console.log({nextPositionAvailableInColumn});

        const positionUpdateProps: PositionUpdate = {
          used:true,
          playerOccupied: this.whoseTurn 
        }
        const player = this.userService.getPlayers().filter(p => p.player == this.whoseTurn)[0];
        this.userService.addPositionToPlayer(nextPositionAvailableInColumn, this.whoseTurn)
        this.positionService.updatePosition(nextPositionAvailableInColumn, positionUpdateProps);
        const playerWon:boolean = this.positionService.checkIfPlayerWon(player.positions);
        if(playerWon) {
          this.theresAWinner = true
        }
        const message:string = `${player.player} ${playerWon ? "won" : "didn't win"}`;
        console.log(message)
        this.userService.updateWhoseTurnItIs();
        break
      }
      else {
        continue
      }
    }

    if(nextPositionAvailableInColumn === null) {
      console.log(`no positions in column ${column.id} available`);
      this.handleClick()
    }
  }

  handleButtonClick() {
    if(this.theresAWinner) {
      console.log("game over. reset game to start over")
    }
    else {
      let timesCalled: number = 0
      this.handleClick();
      timesCalled++
      if(!this.theresAWinner) {
        setTimeout(() => {
          this.handleClick()
          timesCalled++
        }, 1000)
      }
      console.log({timesCalled})
  
    }
  }
}
