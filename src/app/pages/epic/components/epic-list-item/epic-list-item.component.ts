import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Epic } from '@state';

@Component({
  selector: 'app-epic-list-item',
  templateUrl: './epic-list-item.component.html',
  styleUrls: ['./epic-list-item.component.scss']
})
export class EpicListItemComponent {
  @Input() epic!: Epic;
  @Output() editClicked = new EventEmitter<Epic>();
  @Output() deleteClicked = new EventEmitter<Epic>();

  onEditClicked() {
    this.editClicked.emit(this.epic);
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.epic);
  }
}
