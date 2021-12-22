import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { openLabelAddDialog } from '../actions/label.actions';
import { map, mergeMap } from 'rxjs/operators';
import { LabelService } from '../services/label.service';
import { LabelDialogComponent } from '../../shared/creation-dialogs/components/label-dialog/label-dialog.component';
import { LabelDialogData } from '../../pages/label/models';
import { LabelDialogResult } from '../../shared/creation-dialogs/models/label-dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class LabelEffects {
  openAddDiallog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openLabelAddDialog),
        mergeMap(() => {
          const dialogRef = this.dialog.open<LabelDialogComponent, LabelDialogData, LabelDialogResult>(LabelDialogComponent, {
            data: {
              case: 'add'
            }
          });

          return dialogRef.afterClosed().pipe(
            map(result => {
              if (result?.ok && result.label) {
                this.labelService.add(result?.label);
                this.labelService.getAll();
              }
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions, private readonly labelService: LabelService, private readonly dialog: MatDialog) {}
}
