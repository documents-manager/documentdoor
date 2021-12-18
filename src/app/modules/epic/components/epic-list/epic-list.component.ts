import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Epic } from '@state';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpicListComponent {
  @Input() epics!: Epic[];
  @Output() editClicked = new EventEmitter<Epic>();
  @Output() deleteClicked = new EventEmitter<Epic>();

  onEditClicked(epic: Epic) {
    this.editClicked.emit(epic);
  }

  onDeleteClicked(epic: Epic) {
    this.deleteClicked.emit(epic);
  }
}
