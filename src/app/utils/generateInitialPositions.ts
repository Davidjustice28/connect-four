import { GridPosition } from "../_types/grid.types";

export function generateInitialPositions() {
  const positions: GridPosition[] = []
  for(let i=0; i<42; i++) {
    const newPosition: GridPosition = {
      index:i,
      playerOccupied: "",
      used:false
    };
    positions.push(newPosition);
  }
  return(positions);
}