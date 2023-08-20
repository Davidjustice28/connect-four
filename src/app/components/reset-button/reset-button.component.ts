import { Component, inject, OnInit } from "@angular/core";
import { GridPosition } from "src/app/_types/grid.types";
import { GameService } from "src/app/services/game.service";
import { PositionsService } from "src/app/services/positions.service";

@Component({
  selector: 'app-reset-button',
  template: `
  <div id="game-buttons-section">
    <button (click)="handleClick()">Reset Game</button>
  </div>
  `,
  styleUrls: ['./reset-button.component.css']
})

export class ResetButtonComponet implements OnInit{
  gameService = inject(GameService)
  positionService = inject(PositionsService)
  positionsFound!: GridPosition[]
  ngOnInit(): void {
    this.positionService.positionsSource.subscribe(positions => this.positionsFound = positions)
  }
  constructor(){}

  handleClick(): void {
    this.gameService.resetGame()
  }
}