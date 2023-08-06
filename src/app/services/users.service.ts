import { Injectable } from '@angular/core';
import { Player } from '../_types/players.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  players: Player[] = [
    {player:"player1", positions:[]},
    {player: "player2", positions:[]}
  ]
  private whoseTurnSource = new BehaviorSubject<"player1" | "player2">("player1")
  whoseTurn = this.whoseTurnSource.asObservable()
  constructor() { }

  getPlayers(): Player[] {
    return(this.players);
  }

  resetPlayersPositions(): void {
    this.players = this.players.map(player => {
      return({...player, positions:[]});
    })
    this.whoseTurnSource.next("player1")
  }

  addPositionToPlayer(positionIndex:number, playerNumber: "player1"| "player2"): void {
    this.players = this.players.map(player => {
      if(player.player === playerNumber) {
        const positions = player.positions;
        positions.push(positionIndex);
        return({...player, positions});
      }
      else {
        return player;
      }
    });
  }
  
  updateWhoseTurnItIs(): void {
    this.whoseTurnSource.next((this.whoseTurnSource.value == "player1") ? "player2" : "player1")
  }

  
}
