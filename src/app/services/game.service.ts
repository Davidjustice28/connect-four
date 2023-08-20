import { Injectable, inject } from '@angular/core';
import { UsersService } from './users.service';
import { PositionsService } from './positions.service';
import { ColumnPositionService } from './column-positions.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameover:boolean=true
  userService = inject(UsersService)
  positionService = inject(PositionsService)
  columnService = inject(ColumnPositionService)
  constructor() { }

  resetGame(): void {
    this.positionService.resetPositionData()
    this.userService.resetPlayersPositions()
    console.log("pressed reset game button")
  }
}
