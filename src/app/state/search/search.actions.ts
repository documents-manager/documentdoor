import { createAction, props } from '@ngrx/store';
import { AutocompleteResult, Page, SearchResult, Sort } from './search.model';
import { HttpErrorResponse } from '@angular/common/http';

export const search = createAction('[Search/Page] Search Searchs');

export const searchSuccess = createAction('[Search/API] Search Success', props<{ results: SearchResult }>());

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: HttpErrorResponse }>());

export const selectDocument = createAction('[Search/Page] Select Document', props<{ documentId: number }>());

export const resetSelection = createAction('[Search/Page] Reset Selection');

// Search attributes

export const searchQuery = createAction('[Search/API] Search Query', props<{ query: string }>());

export const searchChangePage = createAction('[Search/API] Change Page', props<Page>());

export const searchChangeSort = createAction('[Search/API] Change Sort', props<Sort>());

// Autocomplete

export const autocomplete = createAction('[Search/Page] Autocomplete', props<{ term: string }>());

export const autocompleteSuccess = createAction('[Search/API] Autocomplete Success', props<{ results: AutocompleteResult }>());

export const autocompleteFailure = createAction('[Search/API] Autocomplete Failure', props<{ error: HttpErrorResponse }>());
