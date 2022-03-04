import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-entity-menu',
  templateUrl: './create-entity-menu.component.html',
  styleUrls: ['./create-entity-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEntityMenuComponent {
  @Output() addEpicClicked = new EventEmitter<void>();
  @Output() addLabelClicked = new EventEmitter<void>();
  @Output() addDocumentClicked = new EventEmitter<void>();

  constructor() {}

  onAddLabelClicked() {
    this.addLabelClicked.emit();
  }

  onAddEpicClicked() {
    this.addEpicClicked.emit();
  }

  onAddDocumentClicked() {
    this.addDocumentClicked.emit();
  }
}
