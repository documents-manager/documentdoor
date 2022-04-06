import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentDialogData, DocumentDialogResult } from './document-dialog';
import { DocumentEditComponent } from '../document-edit/document-edit/document-edit.component';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDialogComponent implements OnInit {
  @ViewChild('docEdit') documentEditComponent!: DocumentEditComponent;

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent, DocumentDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    const document = this.documentEditComponent.createDocumentDto();
    this.dialogRef.close({
      ok: true,
      document
    });
  }
}
