import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { searchTerm } from '../state/search/search.selectors';
import { State } from '../state/reducers';
import { search } from '../state/search/search.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  term$: Observable<string> = this.store.select(searchTerm);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private readonly store: Store, private readonly breakpointObserver: BreakpointObserver) {}

  onSearchTermChanged(term: string) {
    this.store.dispatch(search({ term }));
  }
}
