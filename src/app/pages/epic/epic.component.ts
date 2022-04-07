import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EpicService } from '../../state/services/epic.service';
import { Observable } from 'rxjs';
import { Epic } from '@state';
import { MatDialog } from '@angular/material/dialog';
import { EpicDialogComponent } from '../../shared/epic-dialog/epic-dialog.component';
import { EpicDialogData, EpicDialogResult } from '../../shared/epic-dialog/epic-dialog';
import { DocumentService } from '../../state/services/document.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpicComponent {
  epics$: Observable<Epic[]>;

  constructor(private epicService: EpicService, private dialog: MatDialog, private documentService: DocumentService) {
    this.epics$ = epicService.entities$;
    this.epicService.getAll();
    this.documentService.getAll();
  }

  onEditEpic(epic: Epic) {
    const dialogRef = this.dialog.open<EpicDialogComponent, EpicDialogData, EpicDialogResult>(EpicDialogComponent, {
      data: {
        case: 'edit',
        epic
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.ok && result.epic) {
        this.epicService.update(result?.epic);
      }
    });
  }

  onDeleteEpic(epic: Epic) {
    this.epicService.delete(epic);
  }
}
