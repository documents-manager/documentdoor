import { createAction, props } from '@ngrx/store';
import { SearchResult } from './search.model';
import { HttpErrorResponse } from '@angular/common/http';

export const search = createAction('[Search/Page] Search Searchs', props<{ term: string }>());

export const searchSuccess = createAction('[Search/API] Search Success', props<{ results: SearchResult[] }>());

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: HttpErrorResponse }>());
