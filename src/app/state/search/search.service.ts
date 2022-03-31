import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {AutocompleteResult, SearchRequest, SearchResult} from './search.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(request: SearchRequest): Observable<SearchResult> {
    return this.http.post<SearchResult>(environment.serverConfig.root + '/search', request);
  }

  autocomplete(query: string): Observable<AutocompleteResult> {
    return this.http.get<AutocompleteResult>(environment.serverConfig.root + '/autocomplete', {
      params: {
        q: query
      }
    })
  }
}
