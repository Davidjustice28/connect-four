import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridPositionComponent } from './components/grid-position/grid-position.component';
import { GamegridComponent } from './components/gamegrid/gamegrid.component';
import { ColumnButtonComponent } from './components/column-button/column-button.component';
import { ColumnButtonsSectionComponent } from './components/column-buttons-section/column-buttons-section.component';

@NgModule({
  declarations: [
    AppComponent,
    GridPositionComponent,
    GamegridComponent,
    ColumnButtonComponent,
    ColumnButtonsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
