import { TestBed } from '@angular/core/testing';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { EpicService } from './epic.service';

describe('EpicService', () => {
  let service: EpicService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EntityCollectionServiceElementsFactory, EpicService]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(EpicService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
