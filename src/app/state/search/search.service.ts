import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest, SearchResult } from './search.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(request: SearchRequest): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(environment.serverConfig.root + '/search', request);
  }
}
