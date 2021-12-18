import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { openAddDialog } from '../actions/label.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { LabelService } from '../services/label.service';
import { LabelDialogComponent } from '../../modules/label/components/label-dialog/label-dialog.component';
import { LabelDialogData } from '../../modules/label/models';
import { LabelDialogResult } from '../../modules/label/models/label-dialog';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

@Injectable()
export class LabelEffects {
  openAddDiallog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openAddDialog),
        mergeMap(() => {
          const dialogRef = this.dialog.open<LabelDialogComponent, LabelDialogData, LabelDialogResult>(
            LabelDialogComponent,
            {
              data: {
                case: 'add'
              }
            }
          );

          return dialogRef.afterClosed().pipe(
            map((result) => {
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

  constructor(
    private readonly actions$: Actions,
    private readonly labelService: LabelService,
    private readonly dialog: MatDialog
  ) {}
}
