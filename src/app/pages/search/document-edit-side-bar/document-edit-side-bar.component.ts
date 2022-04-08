import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Document } from '@state';
import { DocumentEditComponent } from '../../../shared/document-edit/document-edit/document-edit.component';
import { EpicService } from '../../../state/services/epic.service';
import { LabelService } from '../../../state/services/label.service';

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
  epics$ = this.epicService.getAll();
  labels$ = this.labelService.getAll();

  constructor(private epicService: EpicService, private labelService: LabelService) {}

  ngOnInit(): void {}

  onNoClick() {
    this.closed.emit();
  }

  onSaveClick() {
    this.save.emit(this.docEdit.createDocumentDto());
  }
}
