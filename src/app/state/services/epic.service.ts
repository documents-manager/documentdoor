import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Epic } from '@state';

@Injectable({ providedIn: 'root' })
export class EpicService extends EntityCollectionServiceBase<Epic> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Epic', serviceElementsFactory);
  }
}
