import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityMenuComponent } from './create-entity-menu.component';

describe('CreateEntityMenuComponent', () => {
  let component: CreateEntityMenuComponent;
  let fixture: ComponentFixture<CreateEntityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEntityMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
