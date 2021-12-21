import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Label } from '@state';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelListComponent {
  @Input() labels!: Label[];
  @Output() editClicked = new EventEmitter<Label>();
  @Output() deleteClicked = new EventEmitter<Label>();

  onEditClicked(label: Label) {
    this.editClicked.emit(label);
  }

  onDeleteClicked(label: Label) {
    this.deleteClicked.emit(label);
  }
}
