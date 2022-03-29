import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DocumentTableDataSource } from './document-table-datasource';
import { search, searchChangePage, selectDocument, searchChangeSort } from '../../state/search/search.actions';
import { selectedDocument, selectAllDocuments } from '../../state/search/search.selectors';
import { Store } from '@ngrx/store';
import { SortOrder } from 'src/app/state/search/search.model';

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

  selectedDocument$ = this.store.select(selectedDocument);
  allArticles$ = this.store.select(selectAllDocuments);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'epic', 'label', 'lastUpdated', 'created'];

  constructor(
    private readonly store: Store,
  ) {
    this.dataSource = new DocumentTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  selectDocument(document: DocumentTableItem) {
    this.store.dispatch(selectDocument({document}));
    this.allArticles$.subscribe(document => console.log(document));
  }

  changePage(pageEvent: PageEvent) {
    this.store.dispatch(searchChangePage({index: pageEvent.pageIndex, size: pageEvent.pageSize}));
    this.store.dispatch(search());
  }

  changeSort(event: {active: string, direction: string}) {
    console.log(event);
    this.store.dispatch(searchChangeSort({
      field: !event.direction ? '' : event.active,
      order: event.direction === 'asc' ? SortOrder.DESC : SortOrder.ASC,
    }));
    this.store.dispatch(search());
  }
}
