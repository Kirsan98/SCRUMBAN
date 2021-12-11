import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column } from '../models/column.model';

@Injectable({
  providedIn: 'root'
})
export class RefreshColService {
  private columnsSrc: BehaviorSubject<Column[]>;
  public currentColumns;

  constructor() { 
    this.columnsSrc = new BehaviorSubject<Column[]>([new Column()]);
    this.currentColumns = this.columnsSrc.asObservable();
  }

  public refreshColumns(columns: Column[]):void{
    this.columnsSrc.next(columns);
  }
}
