import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { search, searchChangePage, selectDocument, searchChangeSort, resetSelection } from '../../state/search/search.actions';
import { selectedDocumentId, searchedDocuments, searchHitCount, searchPage } from '../../state/search/search.selectors';
import { Store } from '@ngrx/store';
import { SortOrder } from 'src/app/state/search/search.model';
import { DocumentList } from 'src/app/state/models/document';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DocumentList>;

  selectedDocumentId$ = this.store.select(selectedDocumentId);
  allArticles$ = this.store.select(searchedDocuments);
  searchHitCount$ = this.store.select(searchHitCount);
  searchPage$ = this.store.select(searchPage)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'epic', 'label', 'lastUpdated', 'created'];

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectDocument(documentId: number) {
    const currentId = this.route.snapshot.queryParams?.documentId;
    const queryParams: Params = { documentId: currentId == documentId ? undefined : documentId };

    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge',
      });
  }

  changePage(pageEvent: PageEvent) {
    this.store.dispatch(searchChangePage({index: pageEvent.pageIndex, size: pageEvent.pageSize}));
    this.store.dispatch(search());
  }

  changeSort(event: Sort) {
    this.store.dispatch(searchChangeSort({
      field: !event.direction ? '' : event.active,
      order: event.direction === 'asc' ? SortOrder.ASC : SortOrder.DESC,
    }));
    this.store.dispatch(search());
  }
}
