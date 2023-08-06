import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridPositionComponent } from './components/grid-position/grid-position.component';
import { GamegridComponent } from './components/gamegrid/gamegrid.component';
import { ColumnButtonComponent } from './components/column-button/column-button.component';
import { ColumnButtonsSectionComponent } from './components/column-buttons-section/column-buttons-section.component';
import { CommonModule } from '@angular/common';
import { ResetButtonComponet } from './components/reset-button/reset-button.component';

@NgModule({
  declarations: [
    AppComponent,
    GridPositionComponent,
    GamegridComponent,
    ColumnButtonComponent,
    ColumnButtonsSectionComponent,
    ResetButtonComponet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
