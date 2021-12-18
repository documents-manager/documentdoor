import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Label } from '@state';

@Injectable({ providedIn: 'root' })
export class LabelService extends EntityCollectionServiceBase<Label> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Label', serviceElementsFactory);
  }
}
