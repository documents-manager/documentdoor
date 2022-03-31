import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDialogComponent } from './document-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { DocumentReferenceModule } from '../document-reference/document-reference.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DocumentEditModule } from '../document-edit/document-edit.module';

const components = [DocumentDialogComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    FileUploadModule,
    DocumentReferenceModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    DocumentEditModule
  ],
  exports: components
})
export class DocumentDialogModule {}
