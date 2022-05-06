import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Asset, Document, DocumentReference} from '@state';

@Injectable({
  providedIn: 'root'
})
export class FormFactoryService {
  constructor(private fb: FormBuilder) {
  }

  buildDocumentForm(document: Document | null) {
    const references = this.buildReferenceForm(document?.references ?? []);
    const assets = this.buildAssetForm(document?.assets ?? []);
    return this.fb.group({
      title: [document?.title ?? '', [Validators.required]],
      description: [document?.description ?? ''],
      label: [null],
      epic: [null],
      references,
      assets
    });
  }

  buildAssetForm(assets: Asset[]) {
    return this.fb.array(
      assets.map(asset => new FormControl(asset)),
      Validators.required
    );
  }

  buildReferenceForm(references: DocumentReference[]) {
    return this.fb.array(
      references.map(reference =>
        this.fb.group({
          referenceType: [reference.referenceType, [Validators.required]],
          targetDocument: [reference.targetDocument, [Validators.required]],
          sourceDocument: [reference.sourceDocument]
        })
      )
    );
  }
}
