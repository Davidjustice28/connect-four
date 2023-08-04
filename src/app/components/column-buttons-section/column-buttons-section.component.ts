import { Component } from '@angular/core';

@Component({
  selector: 'app-column-buttons-section',
  template:`<div>
    <app-column-button *ngFor="let button of buttons" [text]="button"></app-column-button>
  </div>`,
  styleUrls: ['./column-buttons-section.component.css']
})
export class ColumnButtonsSectionComponent {
  buttons = ["C0", "C1", "C2", "C3", "C4", "C5", "C6"]
}
