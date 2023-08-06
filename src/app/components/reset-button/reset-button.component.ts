import { Component, inject } from "@angular/core";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: 'app-reset-button',
  template: `<button (click)="handleClick()">Reset Game</button>`,
  styleUrls: ['./reset-button.component.css']
})

export class ResetButtonComponet {
  gameService = inject(GameService)
  constructor(){}

  handleClick(): void {
    this.gameService.resetGame()
  }
}