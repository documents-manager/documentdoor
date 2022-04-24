import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DocumentList } from '@state';
import { Stats } from './dashboard.model';
import { APP_ENV, Environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(@Inject(APP_ENV) private env: Environment, private http: HttpClient) {}

  loadLastCreatedDocuments() {
    return this.http.get<DocumentList[]>(`${this.env.root}/dashboard/last-created-documents`);
  }

  loadLastUpdatedDocuments() {
    return this.http.get<DocumentList[]>(`${this.env.root}/dashboard/last-updated-documents`);
  }

  loadStats() {
    return this.http.get<Stats>(`${this.env.root}/dashboard/count`);
  }

  reindexDocuments() {
    return this.http.get<void>(`${this.env.root}/dashboard/reindex`);
  }
}
