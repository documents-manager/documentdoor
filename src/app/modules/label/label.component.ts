import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from '@state';
import { LabelService } from '../../state/services/label.service';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { LabelDialogData } from './models';
import { LabelDialogResult } from './models/label-dialog';

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

  onAddLabel() {
    const dialogRef = this.dialog.open<LabelDialogComponent, LabelDialogData, LabelDialogResult>(LabelDialogComponent, {
      data: {
        case: 'add'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.ok && result.label) {
        this.labelService.add(result?.label);
        this.labelService.getAll();
      }
    });
  }

  onEditLabel(label: Label) {
    const dialogRef = this.dialog.open<LabelDialogComponent, LabelDialogData, LabelDialogResult>(LabelDialogComponent, {
      data: {
        case: 'edit',
        label
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.ok && result.label) {
        this.labelService.update(result?.label);
      }
    });
  }

  onDeleteLabel(label: Label) {
    this.labelService.delete(label);
  }
}