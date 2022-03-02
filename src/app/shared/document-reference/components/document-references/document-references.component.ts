import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DocumentReferenceType } from '@state';

@Component({
  selector: 'app-document-references',
  templateUrl: './document-references.component.html',
  styleUrls: ['./document-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentReferencesComponent implements OnInit {
  @Input() references!: FormArray;

  constructor(private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}

  addReference() {
    const group = this.fb.group({
      type: [DocumentReferenceType.MENTION, [Validators.required]],
      document: ['', [Validators.required]]
    });
    this.references.push(group);
    this.changeDetector.detectChanges();
  }
}
