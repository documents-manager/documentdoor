import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SearchResult } from './search.model';
import * as SearchActions from './search.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const searchesFeatureKey = 'search';

export interface SearchState extends EntityState<SearchResult> {
  // additional entities state properties
  term: string;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const adapter: EntityAdapter<SearchResult> = createEntityAdapter<SearchResult>();

export const initialState: SearchState = adapter.getInitialState({
  // additional entity state properties
  term: '',
  loading: false,
  error: null
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
    ...adapter.setAll(action.results, state),
    loading: false,
    error: null
  })),
  on(SearchActions.searchFailure, (state, action) => ({
    ...adapter.removeAll(state),
    loading: true,
    error: action.error
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
