import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MatDialog} from "@angular/material/dialog";
import {EpicService} from "../services/epic.service";
import {map, mergeMap} from "rxjs/operators";
import {EpicDialogComponent} from "../../pages/epic/components/epic-dialog/epic-dialog.component";
import {EpicDialogData} from "../../pages/epic/models";
import {EpicDialogResult} from "../../pages/epic/models/epic-dialog";
import {openEpicAddDialog} from "../actions/epic.actions";


@Injectable()
export class EpicEffects {

  openAddDiallog$ = createEffect(
      () =>
          this.actions$.pipe(
              ofType(openEpicAddDialog),
              mergeMap(() => {
                const dialogRef = this.dialog.open<EpicDialogComponent, EpicDialogData, EpicDialogResult>(EpicDialogComponent, {
                  data: {
                    case: 'add'
                  }
                });

                return dialogRef.afterClosed().pipe(
                    map(result => {
                      if (result?.ok && result.epic) {
                        this.epicService.add(result?.epic);
                        this.epicService.getAll();
                      }
                    })
                );
              })
          ),
      { dispatch: false }
  );

  constructor(private readonly actions$: Actions, private readonly epicService: EpicService, private readonly dialog: MatDialog) {}

}
