import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '@state';

@Component({
  selector: 'app-label-list-item',
  templateUrl: './label-list-item.component.html',
  styleUrls: ['./label-list-item.component.scss']
})
export class LabelListItemComponent {
  @Input() label!: Label;
  @Output() editClicked = new EventEmitter<Label>();
  @Output() deleteClicked = new EventEmitter<Label>();

  onEditClicked() {
    this.editClicked.emit(this.label);
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.label);
  }
}
