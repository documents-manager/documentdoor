import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTableComponent } from './document-table/document-table.component'

const routes: Routes = [{ path: '', component: DocumentTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
