import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
   <h1>Connect Four</h1>
   <p>Play against an automated computer in browser</p>
   <p *ngIf='whoseTurn == "player2"'>It's the computer's turn</p>
   <p *ngIf='whoseTurn == "player1"'>It's your turn</p>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  userService = inject(UsersService)
  whoseTurn!:string
  ngOnInit(): void {
    this.userService.whoseTurn.subscribe(player => this.whoseTurn = player)
  }
}
