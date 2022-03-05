import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {searchTerm} from '../state/search/search.selectors';
import {search} from '../state/search/search.actions';
import {openLabelAddDialog} from '../state/actions/label.actions';
import {openEpicAddDialog} from '../state/actions/epic.actions';
import {NavigationService} from "./services/navigation.service";
import {TreeNode} from "./models";

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
  data$: Observable<TreeNode[]>;

  constructor(private readonly store: Store, private readonly breakpointObserver: BreakpointObserver, private navigationService: NavigationService) {
      this.data$ = this.navigationService.data$;
  }

  onSearchTermChanged(term: string) {
    this.store.dispatch(search({term}));
  }

  addLabelClicked() {
    this.store.dispatch(openLabelAddDialog());
  }

  addEpicClicked() {
    this.store.dispatch(openEpicAddDialog());
  }
}
