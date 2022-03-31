import { Component, OnInit } from '@angular/core';
import { Document } from '@state';
import { Store } from '@ngrx/store';
import { selectedDocumentId } from '../../state/search/search.selectors';
import { DocumentService } from '../../state/services/document.service';
import { filter, switchMap } from 'rxjs/operators';
import { resetSelection } from '../../state/search/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  selectedDocumentId$ = this.store.select(selectedDocumentId);
  selectedDocument$ = this.selectedDocumentId$.pipe(
    filter(documentId => !!documentId),
    switchMap(documentId => this.documentService.getByKey(documentId))
  );

  constructor(private store: Store, private documentService: DocumentService) {}

  ngOnInit(): void {}

  onClosed() {
    this.store.dispatch(resetSelection());
  }

  onSave(document: Document) {
    this.documentService.update(document);
  }
}
