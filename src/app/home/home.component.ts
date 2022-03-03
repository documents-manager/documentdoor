import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { autocompletions, searchTerm } from '../state/search/search.selectors';
import { autocomplete, search } from '../state/search/search.actions';
import { openLabelAddDialog } from '../state/actions/label.actions';
import { openEpicAddDialog } from '../state/actions/epic.actions';
import { openDocumentDialog } from '../state/actions/document.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  term$: Observable<string> = this.store.select(searchTerm);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
  autocompletion$ = this.store.select(autocompletions);

  constructor(private readonly store: Store, private readonly breakpointObserver: BreakpointObserver) {}

  onSearchTermChanged(term: string) {
    this.store.dispatch(autocomplete({ term }));
  }

  onSearchSubmit(query: string) {
    this.store.dispatch(
      search({
        request: {
          query
        }
      })
    );
  }

  addLabelClicked() {
    this.store.dispatch(openLabelAddDialog());
  }

  addEpicClicked() {
    this.store.dispatch(openEpicAddDialog());
  }

  addDocumentClicked() {
    this.store.dispatch(openDocumentDialog());
  }
}
