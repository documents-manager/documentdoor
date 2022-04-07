import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DocumentReferenceModule } from '../document-reference/document-reference.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [DocumentEditComponent],
  exports: [DocumentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    DocumentReferenceModule,
    FileUploadModule,
    MatIconModule,
    MatInputModule,
    FlexModule,
    MatDividerModule
  ]
})
export class DocumentEditModule {}
