import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';
import { selectAll } from 'src/app/state/search/search.reducer';

export const selectSearch = createFeatureSelector<SearchState>('search');

export const searchTerm = createSelector(selectSearch, searchState => searchState.term);
export const searchLoading = createSelector(selectSearch, searchState => searchState.loading);
export const searchError = createSelector(selectSearch, searchState => searchState.error);
export const autocompletions = createSelector(selectSearch, searchState => searchState.autocomplete);

export const selectedDocument = createSelector(selectSearch, searchState => searchState.selectedDocumentId ? searchState.entities[searchState.selectedDocumentId] : undefined);
export const selectedDocumentId = createSelector(selectSearch, searchState => searchState.selectedDocumentId);

export const searchQuery = createSelector(selectSearch, searchState => searchState.query);
export const searchPage = createSelector(selectSearch, searchState => searchState.page);
export const searchSort = createSelector(selectSearch, searchState => searchState.sort);

export const searchHitCount = createSelector(selectSearch, searchState => searchState.hitCount);
export const searchedDocuments = createSelector(selectSearch, selectAll);
