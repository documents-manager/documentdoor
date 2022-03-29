import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from './search.service';
import { autocomplete, autocompleteFailure, autocompleteSuccess, search, searchFailure, searchSuccess } from './search.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { searchQuery, searchPage, searchSort } from './search.selectors';

@Injectable()
export class SearchEffects {
  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(search),
      withLatestFrom(
        this.store.select(searchQuery),
        this.store.select(searchPage),
        this.store.select(searchSort),
      ),
      mergeMap(([action, query, page, sort]) =>
        this.searchService.search(
          {
            query,
            page,
            sort,
          }
        ).pipe(
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

  constructor(
    private actions$: Actions, 
    private searchService: SearchService,
    private readonly store: Store,
  ) {}
}
