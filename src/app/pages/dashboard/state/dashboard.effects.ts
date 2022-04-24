import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as DashboardActions from './dashboard.actions';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardEffects {
  loadStats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadStats),
      concatMap(() =>
        this.dashboardService.loadStats().pipe(
          map(data => DashboardActions.loadStatsSuccess({ data })),
          catchError(error => of(DashboardActions.loadStatsFail({ error })))
        )
      )
    );
  });
  reindex$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.reindex),
      concatMap(() =>
        this.dashboardService.reindexDocuments().pipe(
          map(() => DashboardActions.reindexSuccess()),
          catchError(error => of(DashboardActions.reindexFail({ error })))
        )
      )
    );
  });
  loadLastUpdatedDcouemnts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadLastUpdatedDocuments),
      concatMap(() =>
        this.dashboardService.loadLastUpdatedDocuments().pipe(
          map(data => DashboardActions.loadLastUpdatedDocumentsSuccess({ data })),
          catchError(error => of(DashboardActions.loadLastUpdatedDocumentsFail({ error })))
        )
      )
    );
  });

  loadLastCreatedDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadLastCreatedDocuments),
      concatMap(() =>
        this.dashboardService.loadLastCreatedDocuments().pipe(
          map(data => DashboardActions.loadLastCreatedDocumentsSuccess({ data })),
          catchError(error => of(DashboardActions.loadLastCreatedDocumentsFail({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private dashboardService: DashboardService) {}
}
