import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelDialogComponent } from './label-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const components = [LabelDialogComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatButtonModule, FormsModule, MatInputModule],
  exports: components
})
export class LabelDialogModule {}
