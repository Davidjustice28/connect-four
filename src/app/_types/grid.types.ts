export type PositionPlayer ="player1" |"player2"| "";

export interface GridPosition {
  index:number;
  used:boolean;
  playerOccupied:PositionPlayer;
}

export interface PositionUpdate {
  used:boolean,
  playerOccupied: PositionPlayer
}