import { Injectable } from '@angular/core';
import { Column } from '../_types/column.types';

@Injectable({
  providedIn: 'root'
})
export class ColumnPositionService {
  columns: Array<Column> = []
  constructor() { 
    this.columns = this.generateColumns();
  }

  private generateColumn(id:number, entries:number=6,factor: number=0): Column {
    const positions: Array<number> = [];
    for(let i=0; i < entries; i++) {
      const positionNumber = i * 7 + factor;
      positions.push(positionNumber);
    }
    return({id, positions});
  }

  private generateColumns(): Array<Column> {
    const columns: Array<Column> = [];
    for(let columnIndex = 0; columnIndex < 7; columnIndex++) {
      const column = this.generateColumn(columnIndex, 6, columnIndex);
      columns.push(column)
    }
    return(columns);
  }
}
