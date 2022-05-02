import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DocumentLink, DocumentReferenceType} from '@state';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SearchService} from '../../../../state/search/search.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-document-reference',
  templateUrl: './document-reference.component.html',
  styleUrls: ['./document-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentReferenceComponent implements OnInit {
  @ViewChild('documentInput') documentInput!: ElementRef<HTMLInputElement>;
  @Input() control!: FormGroup;
  @Input() editable!: boolean;
  @Output() removed = new EventEmitter<void>();
  documentTitleControl = new FormControl();
  types = DocumentReferenceType;
  filteredDocuments$!: Observable<DocumentLink[]>;

  constructor(private searchService: SearchService, private hostElement: ElementRef) {}

  ngOnInit(): void {
    this.filteredDocuments$ = this.documentTitleControl!.valueChanges.pipe(
        startWith(null),
        switchMap(query => {
          if (typeof query !== 'string') {
            return of([]);
          }
          return this.searchService.autocomplete(query).pipe(map(autocomplete => autocomplete.document?.hits ?? []));
        })
    );

    if (!this.editable) {
      this.control.disable();
    }
  }

  remove() {
    this.removed.emit();
  }

  clearInputs() {
    this.removed.emit();
  }

  removeDocument(): void {
    this.control.get('targetDocument')!.reset();
    this.documentTitleControl.reset();
    this.documentTitleControl.enable();
  }

  selectDocument(event: MatAutocompleteSelectedEvent, filteredDocuments: DocumentLink[]) {
    const { assets, ...documentLink } = this._findDocument(event.option.viewValue, filteredDocuments) ?? {};
    this.documentInput.nativeElement.value = '';
    this.documentTitleControl.setValue(null);
    this.documentTitleControl.disable();
    this.control.get('targetDocument')!.setValue(documentLink);
  }

  private _findDocument(title: string, filteredDocuments: DocumentLink[]): DocumentLink | undefined {
    return filteredDocuments.find(document => document.title === title);
  }
}
