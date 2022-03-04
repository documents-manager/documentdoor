import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReferencesComponent } from './document-references.component';

describe('DocumentReferencesComponent', () => {
  let component: DocumentReferencesComponent;
  let fixture: ComponentFixture<DocumentReferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentReferencesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
