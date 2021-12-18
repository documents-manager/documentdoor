import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { searchTerm } from '../state/search/search.selectors';
import { State } from '../state/reducers';
import { search } from '../state/search/search.actions';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export class FileNode {
  children: FileNode[] = [];
  filename: string = "";
  type: any;
}

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

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor(
    private readonly store: Store, 
    private readonly breakpointObserver: BreakpointObserver,
  ) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        filename: "Dashboard",
        type: "exe",
        children: [],
      },
      {
        filename: "Epic",
        type: "",
        children: [
          {
            filename: "Rechnungen",
            type: "exe",
            children: [],
          },
          {
            filename: "Uni",
            type: "exe",
            children: [],
          }
        ],
      },
      {
        filename: "Label",
        type: "",
        children: [
          {
            filename: "Wichtig",
            type: "exe",
            children: [],
          }
        ],
      },
    ]);
  }

  onSearchTermChanged(term: string) {
    this.store.dispatch(search({ term }));
  }

  private _getChildren = (node: FileNode) => { return observableOf(node.children); };
  hasNestedChild = (_: number, nodeData: FileNode) => {return !(nodeData.type); };
}
