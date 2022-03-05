import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Document } from '@state';

@Injectable({ providedIn: 'root' })
export class DocumentService extends EntityCollectionServiceBase<Document> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Document', serviceElementsFactory);
  }
}
