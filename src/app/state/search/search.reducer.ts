import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AutocompleteResult, Page, Sort, SortOrder } from './search.model';
import * as SearchActions from './search.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentList } from '@state';
import { DocumentTableItem } from '../../shared/document-table/document-table.component'

export const searchesFeatureKey = 'search';

export interface SearchState extends EntityState<DocumentList> {
  // additional entities state properties
  term: string;
  selectedDocument: DocumentTableItem;
  query: string;
  loading: boolean;
  error: HttpErrorResponse | undefined;
  autocomplete: AutocompleteResult | undefined;
  page: Page;
  sort: Sort[];
}

export const adapter: EntityAdapter<DocumentList> = createEntityAdapter<DocumentList>();

export const initialState: SearchState = adapter.getInitialState({
  // additional entity state properties
  term: '',
  selectedDocument: {  
    id: 0,
    title: '',
    epic: '',
    label: '',
    lastUpdated: '',
    created: '',
  },
  query: '',
  loading: false,
  error: undefined,
  autocomplete: undefined,
  page: { index: 0, size: 15 },
  sort: [],
});

export const searchReducer = createReducer(
  initialState,
  on(
    SearchActions.search,
    (state, action): SearchState => ({
      ...state,
      page: {index: 0, size: state.page.size},
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
  })),
  on(SearchActions.selectDocument, (state, action) => ({
    ...state,
    selectedDocument: action.document === state.selectedDocument ? initialState.selectedDocument : action.document,
  })),
  on(SearchActions.searchQuery, (state, action) => ({
    ...state,
    query: action.query,
  })),
  on(SearchActions.searchChangePage, (state, action) => ({
    ...state,
    page: {index: action.index, size: action.size},
  })),
  on(SearchActions.searchChangeSort, (state, action) => ({
    ...state,
    sort: !action.field ? [] : [{
      field: action.field, 
      order: action.order,
    }],
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
