import { Injectable } from '@angular/core';
import { Player } from '../_types/players.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  players: Player[] = [
    {player:1, positions:[]},
    {player:2, positions:[]}
  ]
  constructor() { }

  getPlayers(): Player[] {
    return(this.players);
  }

  resetPlayersScores(): void {
    this.players = this.players.map(player => {
      return({...player, positions:[]});
    })
  }

  addPositionToPlayer(positionIndex:number, playerNumber: 1|2): void {
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
}
