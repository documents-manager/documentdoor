import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchResult } from './search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {}

  search(term: string): Observable<SearchResult[]> {
    return of([]);
  }
}
