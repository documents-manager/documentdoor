import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Epic } from '@state';
import { EpicDialogData, EpicDialogResult } from './epic-dialog';

@Component({
  selector: 'app-epic-dialog',
  templateUrl: './epic-dialog.component.html',
  styleUrls: ['./epic-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpicDialogComponent {
  epic: Epic;

  constructor(public dialogRef: MatDialogRef<EpicDialogComponent, EpicDialogResult>, @Inject(MAT_DIALOG_DATA) public data: EpicDialogData) {
    if (data.case === 'add') {
      this.epic = {
        name: ''
      };
    } else {
      this.epic = {
        ...data.epic!
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close({
      ok: false,
      epic: undefined
    });
  }

  onSaveClick(epic: Epic) {
    this.dialogRef.close({
      ok: true,
      epic
    });
  }
}
