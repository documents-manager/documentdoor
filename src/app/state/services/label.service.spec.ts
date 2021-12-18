import { TestBed } from '@angular/core/testing';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { LabelService } from './label.service';

describe('LabelService', () => {
  let service: LabelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EntityCollectionServiceElementsFactory, LabelService]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LabelService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
