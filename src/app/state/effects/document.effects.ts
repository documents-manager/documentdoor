import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { EpicService } from '../services/epic.service';
import { MatDialog } from '@angular/material/dialog';
import { openDocumentDialog } from '../actions/document.actions';
import { DocumentDialogComponent } from '../../shared/document-dialog/document-dialog.component';
import { DocumentDialogData, DocumentDialogResult } from '../../shared/document-dialog/document-dialog';
import { DocumentService } from '../services/document.service';
import { LabelService } from '../services/label.service';
import { combineLatest } from 'rxjs';

@Injectable()
export class DocumentEffects {
  openAddDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDocumentDialog),
        mergeMap(() => {
          return combineLatest([this.epicService.getAll(), this.labelService.getAll()]).pipe(
            switchMap(([epics, labels]) => {
              const dialogRef = this.dialog.open<DocumentDialogComponent, DocumentDialogData, DocumentDialogResult>(
                DocumentDialogComponent,
                {
                  data: {
                    epics,
                    labels
                  },
                  disableClose: true
                }
              );

              return dialogRef.afterClosed().pipe(
                map(result => {
                  if (result?.ok && result.document) {
                    this.documentService.getAll();
                    this.documentService.add(result?.document);
                  }
                })
              );
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly documentService: DocumentService,
    private readonly dialog: MatDialog,
    private readonly epicService: EpicService,
    private readonly labelService: LabelService
  ) {}
}
