import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LabelService} from "../../state/services/label.service";
import {EpicService} from "../../state/services/epic.service";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TreeNode} from "../models";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
   data$: Observable<TreeNode[]>;

  constructor(private readonly store: Store, private readonly breakpointObserver: BreakpointObserver, private labelService: LabelService, private epicService: EpicService) {
    this.data$ = combineLatest([labelService.entities$, epicService.entities$]).pipe(
        map(([labels, epics]) => {
          return [
            {
              name: 'Epics',
              children: epics.map(epic => ({name: epic.name}))
            },
            {
              name: 'Labels',
              children: labels.map(label => ({name: label.name}))
            }
          ]
        })
    );

    this.epicService.getAll();
    this.labelService.getAll();
  }
}
