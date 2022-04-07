import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from '@state';
import { LabelService } from '../../state/services/label.service';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from '../../shared/label-dialog/label-dialog.component';
import { LabelDialogData } from './models';
import { LabelDialogResult } from '../../shared/label-dialog/label-dialog';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  labels$: Observable<Label[]>;

  constructor(private labelService: LabelService, private dialog: MatDialog) {
    this.labels$ = labelService.entities$;
    this.labelService.getAll();
  }

  onEditLabel(label: Label) {
    const dialogRef = this.dialog.open<LabelDialogComponent, LabelDialogData, LabelDialogResult>(LabelDialogComponent, {
      data: {
        case: 'edit',
        label
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.ok && result.label) {
        this.labelService.update(result?.label);
      }
    });
  }

  onDeleteLabel(label: Label) {
    this.labelService.delete(label);
  }
}
