import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DocumentTableDataSource } from './document-table-datasource';
import { search, searchChangePage, selectDocument, searchChangeSort } from '../../state/search/search.actions';
import { selectedDocument } from '../../state/search/search.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface DocumentTableItem {
  id: number,
  title: string,
  epic: string,
  label: string,
  lastUpdated: string,
  created: string,
}

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentTableItem>;
  dataSource: DocumentTableDataSource;
  selectedObs$: Observable<DocumentTableItem> = this.store.select(selectedDocument);
  selected = {};

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'epic', 'label', 'lastUpdated', 'created'];

  constructor(
    private readonly store: Store,
  ) {
    this.dataSource = new DocumentTableDataSource();
    this.selectedObs$.subscribe(document => this.selected = document)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  selectDocument(document: DocumentTableItem) {
    this.store.dispatch(selectDocument({document}));
  }

  changePage(pageEvent: PageEvent) {
    this.store.dispatch(searchChangePage({index: pageEvent.pageIndex, size: pageEvent.pageSize}));
    this.store.dispatch(search());
  }

  changeSort(event: {active: string, direction: string}) {
    console.log(event);
    this.store.dispatch(searchChangeSort({active: event.active, direction: event.direction}));
    this.store.dispatch(search());
  }
}
