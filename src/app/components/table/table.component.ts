import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from "../../services/data.service";

export interface apiData {
  userId: number;
  id: number;
  title: string;
  completed: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'title', 'completed', 'settings'];
  ELEMENT_DATA: apiData[];
  dataSource: MatTableDataSource<apiData>;
  selection = new SelectionModel<apiData>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public API: DataService) { }

  ngOnInit(): void {
    this.API.GetData().subscribe(load => { this.ELEMENT_DATA = Object.values(load); this.dataSource = new MatTableDataSource<apiData>(this.ELEMENT_DATA); this.dataSource.paginator = this.paginator });

  }
 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
 
  checkboxLabel(row?: apiData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

