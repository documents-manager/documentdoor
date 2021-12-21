import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {EpicEffects} from './epic.effects';

describe('EpicEffects', () => {
  let actions$: Observable<any>;
  let effects: EpicEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpicEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(EpicEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
