import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EpicDialogData, EpicDialogResult } from '../../models/epic-dialog';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent, EpicDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: EpicDialogData
  ) {}

  ngOnInit(): void {}
}
