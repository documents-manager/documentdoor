import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EpicService } from '../../state/services/epic.service';
import { Observable } from 'rxjs';
import { Epic } from '@state';
import { delay, startWith } from 'rxjs/operators';
import { WithLoadingPipe } from '../../core/pipes/with-loading.pipe';
import { MatDialog } from '@angular/material/dialog';
import { EpicDialogComponent } from './components/epic-dialog/epic-dialog.component';
import { EpicDialogData } from './models';
import { EpicDialogResult } from './models/epic-dialog';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpicComponent {
  epics$: Observable<Epic[]>;

  constructor(private epicService: EpicService, private dialog: MatDialog) {
    this.epics$ = epicService.entities$;
    this.epicService.getAll();
  }

  onAddEpic() {
    const dialogRef = this.dialog.open<EpicDialogComponent, EpicDialogData, EpicDialogResult>(EpicDialogComponent, {
      data: {
        case: 'add'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.ok && result.epic) {
        this.epicService.add(result?.epic);
        this.epicService.getAll();
      }
    });
  }

  onEditEpic(epic: Epic) {
    const dialogRef = this.dialog.open<EpicDialogComponent, EpicDialogData, EpicDialogResult>(EpicDialogComponent, {
      data: {
        case: 'edit',
        epic
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.ok && result.epic) {
        this.epicService.update(result?.epic);
      }
    });
  }

  onDeleteEpic(epic: Epic) {
    this.epicService.delete(epic);
  }
}
