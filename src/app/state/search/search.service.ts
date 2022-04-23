import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteResult, SearchRequest, SearchResult } from './search.model';
import { HttpClient } from '@angular/common/http';
import { APP_ENV, Environment } from '../../../environments';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(@Inject(APP_ENV) private env: Environment, private http: HttpClient) {}

  search(request: SearchRequest): Observable<SearchResult> {
    return this.http.post<SearchResult>(this.env.root + '/search', request);
  }

  autocomplete(query: string): Observable<AutocompleteResult> {
    return this.http.get<AutocompleteResult>(this.env.root + '/autocomplete', {
      params: {
        q: query
      }
    });
  }
}
