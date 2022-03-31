import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Document } from '@state';
import { DocumentEditComponent } from '../../../shared/document-edit/document-edit/document-edit.component';

@Component({
  selector: 'app-document-edit-side-bar',
  templateUrl: './document-edit-side-bar.component.html',
  styleUrls: ['./document-edit-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentEditSideBarComponent implements OnInit {
  @Input() document!: Document;
  @Output() closed = new EventEmitter<void>();
  @Output() save = new EventEmitter<Document>();
  @ViewChild('docEdit') docEdit!: DocumentEditComponent;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onNoClick() {
    this.closed.emit();
  }

  onSaveClick() {
    this.save.emit(this.docEdit.createDocumentDto());
  }
}
