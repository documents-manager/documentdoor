import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';

const components = [FileUploadComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatIconModule, MatProgressBarModule, MatButtonModule, FlexModule, MatListModule],
  exports: components
})
export class FileUploadModule {}
