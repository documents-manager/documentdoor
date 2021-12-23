import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  @Input() term: string | undefined = '';
  @Output() searchTermChanged: Observable<string>;
  searchFormControl = new FormControl();
  constructor() {
    this.searchTermChanged = this.searchFormControl.valueChanges.pipe(debounceTime(100));
  }
}
