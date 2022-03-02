import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDialogComponent } from './components/epic-dialog/epic-dialog.component';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentDialogComponent } from './components/document-dialog/document-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { DocumentReferenceModule } from '../document-reference/document-reference.module';

const components = [EpicDialogComponent, LabelDialogComponent, DocumentDialogComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    FlexModule,
    MatDividerModule,
    FileUploadModule,
    DocumentReferenceModule,
    MatFormFieldModule,
  ],
  exports: components
})
export class CreationDialogsModule {}
