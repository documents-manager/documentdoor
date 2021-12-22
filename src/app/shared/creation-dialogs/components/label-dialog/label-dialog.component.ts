import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LabelDialogData } from '../../../../pages/label/models';
import { Label } from '@state';
import { LabelDialogResult } from '../../../../pages/label/models/label-dialog';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDialogComponent {
  label: Label;

  constructor(
    public dialogRef: MatDialogRef<LabelDialogComponent, LabelDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: LabelDialogData
  ) {
    if (data.case === 'add') {
      this.label = {
        name: ''
      };
    } else {
      this.label = {
        ...data.label!
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close({
      ok: false,
      label: undefined
    });
  }

  onSaveClick(label: Label) {
    this.dialogRef.close({
      ok: true,
      label
    });
  }
}
