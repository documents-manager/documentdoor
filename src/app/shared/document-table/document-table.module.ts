import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { DocumentTableComponent } from './document-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [DocumentTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [DocumentTableComponent]
})
export class TableModule { }
