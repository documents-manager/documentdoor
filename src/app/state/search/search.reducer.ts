import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AutocompleteResult, Page, Sort, SortOrder } from './search.model';
import * as SearchActions from './search.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentList } from '@state';

export const searchesFeatureKey = 'search';

export interface SearchState extends EntityState<DocumentList> {
  // additional entities state properties
  term: string;
  selectedDocumentId: number | undefined;
  query: string;
  loading: boolean;
  error: HttpErrorResponse | undefined;
  autocomplete: AutocompleteResult | undefined;
  page: Page;
  sort: Sort[];
  hitCount: number;
}

export const adapter: EntityAdapter<DocumentList> = createEntityAdapter<DocumentList>();

export const initialState: SearchState = adapter.getInitialState({
  // additional entity state properties
  term: '',
  selectedDocumentId: undefined,
  query: '',
  loading: false,
  error: undefined,
  autocomplete: undefined,
  page: { index: 0, size: 15 },
  sort: [],
  hitCount: 0
});

export const searchReducer = createReducer(
  initialState,
  on(
    SearchActions.search,
    (state, action): SearchState => ({
      ...state
    })
  ),
  on(SearchActions.searchSuccess, (state, action) => ({
    ...adapter.setAll(action.results?.document?.hits ?? [], state),
    hitCount: action.results?.document?.hitCount,
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
  })),
  on(SearchActions.selectDocument, (state, action) => ({
    ...state,
    selectedDocumenId: action.documentId !== state.selectedDocumentId ? action.documentId : undefined
  })),
  on(SearchActions.searchQuery, (state, action) => ({
    ...state,
    query: action.query,
    page: { index: 0, size: state.page.size }
  })),
  on(SearchActions.searchChangePage, (state, action) => ({
    ...state,
    page: { index: action.index, size: action.size }
  })),
  on(SearchActions.searchChangeSort, (state, action) => ({
    ...state,
    sort: !action.field
      ? []
      : [
          {
            field: action.field,
            order: action.order
          }
        ]
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
