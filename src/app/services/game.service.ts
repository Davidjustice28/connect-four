import { Injectable, inject } from '@angular/core';
import { UsersService } from './users.service';
import { PositionsService } from './positions.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameover:boolean=true
  constructor() { }

  resetGame(): void {
    console.log("pressed reset game button")
  }
}
