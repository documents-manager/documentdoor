import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditSideBarComponent } from './document-edit-side-bar.component';

describe('DocumentEditSideBarComponent', () => {
  let component: DocumentEditSideBarComponent;
  let fixture: ComponentFixture<DocumentEditSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentEditSideBarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEditSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
