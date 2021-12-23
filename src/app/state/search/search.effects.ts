import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from './search.service';
import { search, searchFailure, searchSuccess } from './search.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {
  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(search),
      mergeMap(action =>
        this.searchService.search(action.term).pipe(
          map(results => searchSuccess({ results })),
          catchError(error => of(searchFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private searchService: SearchService) {}
}
