import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { search, searchQuery, selectDocument } from 'src/app/state/search/search.actions';
import { Document } from '@state';
import { selectedDocumentId } from '../../state/search/search.selectors';
import { DocumentService } from '../../state/services/document.service';
import { filter, switchMap } from 'rxjs/operators';
import { resetSelection } from '../../state/search/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  selectedDocumentId$ = this.store.select(selectedDocumentId);
  selectedDocument$ = this.selectedDocumentId$.pipe(
    filter(documentId => !!documentId),
    switchMap(documentId => this.documentService.getByKey(documentId))
  );
  destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private documentService: DocumentService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(queryParams => {
      this.store.dispatch(searchQuery({query: decodeURI(queryParams.query)}));
      this.store.dispatch(search());
      this.store.dispatch(selectDocument({documentId: +queryParams['documentId']}));
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClosed() {
    this.store.dispatch(resetSelection());
  }

  onSave(document: Document) {
    this.documentService.update(document);
  }
}
