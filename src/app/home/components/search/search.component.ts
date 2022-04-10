import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { AutocompleteResult } from '../../../state/search/search.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  @Input() term: string | undefined = '';
  @Input() autocompletion!: AutocompleteResult | undefined;
  @Output() searchTermChanged: Observable<string>;
  @Output() searchSubmit = new EventEmitter<string>();
  showPanel$!: Observable<boolean>;
  isPanelHidden$!: Observable<boolean>;
  isPanelVisible$!: Observable<boolean>;
  @ViewChild(MatInput, { read: ElementRef, static: true }) private inputEl!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: true }) private connectedOverlay!: CdkConnectedOverlay;
  searchFormControl = new FormControl();
  manualClose = new Subject<void>();

  constructor(
    private focusMonitor: FocusMonitor,
  ) {
    this.searchTermChanged = this.searchFormControl.valueChanges.pipe(debounceTime(200));
  }

  ngOnInit(): void {
    const manualClose$ = this.manualClose.pipe(map(() => false));
    const searchStarted$ = this.searchSubmit.pipe(map(() => false));
    this.isPanelHidden$ = this.connectedOverlay.backdropClick.pipe(map(() => false));
    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl).pipe(
      filter(focused => !!focused),
      map(() => true)
    );
    this.showPanel$ = merge(this.isPanelHidden$, this.isPanelVisible$, searchStarted$, manualClose$);
  }

  search() {
    this.searchSubmit.emit(this.searchFormControl.value);
  }

  onAssetClicked(documentId: string | number, assetId: string | number) {
    window.open(environment.serverConfig.root + '/documents/' + documentId + '/assets/' + assetId, 'blank');
  }
  
  onDocumentClicked() {
    this.manualClose.next();
  }
}
