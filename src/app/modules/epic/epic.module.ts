import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpicRoutingModule } from './epic-routing.module';
import { EpicComponent } from './epic.component';
import { EpicListComponent } from './components/epic-list/epic-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { CoreModule } from '../../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EpicDialogComponent } from './components/epic-dialog/epic-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { EpicListItemComponent } from './components/epic-list-item/epic-list-item.component';

@NgModule({
  declarations: [EpicComponent, EpicListComponent, EpicDialogComponent, EpicListItemComponent],
  imports: [
    CommonModule,
    EpicRoutingModule,
    FlexLayoutModule,
    MatListModule,
    CoreModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveComponentModule
  ]
})
export class EpicModule {}
