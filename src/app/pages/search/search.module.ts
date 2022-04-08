import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TableModule } from 'src/app/shared/document-table/document-table.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DocumentEditSideBarComponent } from './document-edit-side-bar/document-edit-side-bar.component';
import { DocumentEditModule } from '../../shared/document-edit/document-edit.module';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { SharedPipesModule } from '../../shared/shared-pipes/shared-pipes.module';

@NgModule({
  declarations: [SearchComponent, DocumentEditSideBarComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TableModule,
    MatSidenavModule,
    MatButtonModule,
    DocumentEditModule,
    FlexModule,
    MatIconModule,
    SharedPipesModule
  ]
})
export class SearchModule {}
