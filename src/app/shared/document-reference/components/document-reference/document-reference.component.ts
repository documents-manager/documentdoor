import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DocumentReferenceType } from '@state';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-reference',
  templateUrl: './document-reference.component.html',
  styleUrls: ['./document-reference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentReferenceComponent implements OnInit {
  @Input() control!: FormGroup;
  @Output() removed = new EventEmitter<void>();
  types = DocumentReferenceType;
  filteredDocuments$!: Observable<Document[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredDocuments$ = this.control.get('document')!.valueChanges.pipe(
      startWith(null),
      switchMap(value => {
        if (typeof value !== 'string') {
          return of([]);
        }

        return of([]);
      })
    );
  }

  remove() {
    this.removed.emit();
  }
}
