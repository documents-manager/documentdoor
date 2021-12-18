import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicListItemComponent } from './epic-list-item.component';

describe('EpicListItemComponent', () => {
  let component: EpicListItemComponent;
  let fixture: ComponentFixture<EpicListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicListItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
