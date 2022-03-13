import { createAction, props } from '@ngrx/store';
import { AutocompleteResult, SearchRequest, SearchResult } from './search.model';
import { HttpErrorResponse } from '@angular/common/http';

export const search = createAction('[Search/Page] Search Searchs', props<{ request: SearchRequest }>());

export const searchSuccess = createAction('[Search/API] Search Success', props<{ results: SearchResult }>());

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: HttpErrorResponse }>());
export const autocomplete = createAction('[Search/Page] Autocomplete', props<{ term: string }>());

export const autocompleteSuccess = createAction('[Search/API] Autocomplete Success', props<{ results: AutocompleteResult }>());

export const autocompleteFailure = createAction('[Search/API] Autocomplete Failure', props<{ error: HttpErrorResponse }>());
