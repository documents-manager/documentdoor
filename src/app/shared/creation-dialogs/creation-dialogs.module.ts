import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDialogComponent } from './components/epic-dialog/epic-dialog.component';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DocumentDialogComponent } from './components/document-dialog/document-dialog.component';

const components = [EpicDialogComponent, LabelDialogComponent, DocumentDialogComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatButtonModule, FormsModule],
  exports: components
})
export class CreationDialogsModule {}
