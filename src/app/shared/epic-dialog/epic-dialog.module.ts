import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicDialogComponent } from './epic-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const components = [EpicDialogComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  exports: components
})
export class EpicDialogModule {}
