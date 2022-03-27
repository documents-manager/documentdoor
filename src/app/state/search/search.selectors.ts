import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearch = createFeatureSelector<SearchState>('search');

// export const selectSearch = (state: State) => state.search;

export const searchTerm = createSelector(selectSearch, searchState => searchState.term);
export const searchLoading = createSelector(selectSearch, searchState => searchState.loading);
export const searchError = createSelector(selectSearch, searchState => searchState.error);

export const autocompletions = createSelector(selectSearch, searchState => searchState.autocomplete);
