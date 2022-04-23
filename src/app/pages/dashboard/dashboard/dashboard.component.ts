import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../state/dashboard.actions';
import { lastCreated, lastUpdated, loadingDashboard, stats } from '../state/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);
  loading$ = this.store.select(loadingDashboard);
  stats$ = this.store.select(stats);
  lastUpdated$ = this.store.select(lastUpdated);
  lastCreated$ = this.store.select(lastCreated);
  /** Based on the screen size, switch from standard to one column per row */
  cards$ = this.isHandset$.pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {
    this.requestLastCreated();
    this.requestLastUpdated();
    this.requestStats();
  }

  reindex() {
    this.store.dispatch(DashboardActions.reindex());
  }

  requestStats() {
    this.store.dispatch(DashboardActions.loadStats());
  }

  requestLastCreated() {
    this.store.dispatch(DashboardActions.loadLastCreatedDocuments());
  }

  requestLastUpdated() {
    this.store.dispatch(DashboardActions.loadLastUpdatedDocuments());
  }
}
