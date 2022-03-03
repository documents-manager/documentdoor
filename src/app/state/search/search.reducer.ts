import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AutocompleteResult } from './search.model';
import * as SearchActions from './search.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentList } from '@state';

export const searchesFeatureKey = 'search';

export interface SearchState extends EntityState<DocumentList> {
  // additional entities state properties
  term: string;
  loading: boolean;
  error: HttpErrorResponse | undefined;
  autocomplete: AutocompleteResult | undefined;
}

export const adapter: EntityAdapter<DocumentList> = createEntityAdapter<DocumentList>();

export const initialState: SearchState = adapter.getInitialState({
  // additional entity state properties
  term: '',
  loading: false,
  error: undefined,
  autocomplete: undefined
});

export const searchReducer = createReducer(
  initialState,
  on(
    SearchActions.search,
    (state, action): SearchState => ({
      ...state,
      term: action.request.query,
      loading: true
    })
  ),
  on(SearchActions.searchSuccess, (state, action) => ({
    ...adapter.setAll(action.results?.document?.hits ?? [], state),
    loading: false,
    error: undefined
  })),
  on(SearchActions.searchFailure, (state, action) => ({
    ...adapter.removeAll(state),
    loading: false,
    error: action.error
  })),
  on(SearchActions.autocomplete, state => ({
    ...state,
    loading: true
  })),
  on(SearchActions.autocompleteSuccess, (state, action) => ({
    ...state,
    autocomplete: action.results,
    loading: false,
    error: undefined
  })),
  on(SearchActions.autocompleteFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
