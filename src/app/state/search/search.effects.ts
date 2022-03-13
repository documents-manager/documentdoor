import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from './search.service';
import { autocomplete, autocompleteFailure, autocompleteSuccess, search, searchFailure, searchSuccess } from './search.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(search),
      mergeMap(action =>
        this.searchService.search(action.request).pipe(
          map(results => searchSuccess({ results })),
          catchError(error => of(searchFailure({ error })))
        )
      )
    );
  });

  autoComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autocomplete),
      mergeMap(action =>
        this.searchService.autocomplete(action.term).pipe(
          map(results => autocompleteSuccess({ results })),
          catchError(error => of(autocompleteFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private searchService: SearchService) {}
}
