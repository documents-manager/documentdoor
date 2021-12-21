import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelListItemComponent } from './label-list-item.component';

describe('LabelListItemComponent', () => {
  let component: LabelListItemComponent;
  let fixture: ComponentFixture<LabelListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelListItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
