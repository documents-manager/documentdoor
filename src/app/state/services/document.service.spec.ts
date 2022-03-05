import { TestBed } from '@angular/core/testing';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EntityCollectionServiceElementsFactory, DocumentService]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(DocumentService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
