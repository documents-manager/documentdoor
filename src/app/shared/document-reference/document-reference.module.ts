import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentReferenceComponent } from './components/document-reference/document-reference.component';
import { DocumentReferencesComponent } from './components/document-references/document-references.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

const components = [DocumentReferenceComponent, DocumentReferencesComponent];
const pipes = [EnumToArrayPipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    RouterModule
  ],
  exports: components
})
export class DocumentReferenceModule {}
