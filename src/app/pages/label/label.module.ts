import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LabelRoutingModule} from './label-routing.module';
import {LabelComponent} from './label.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {CoreModule} from '../../core/core.module';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ReactiveComponentModule} from '@ngrx/component';
import {LabelListComponent} from './components/label-list/label-list.component';
import {LabelListItemComponent} from './components/label-list-item/label-list-item.component';

@NgModule({
  declarations: [LabelComponent, LabelListComponent, LabelListItemComponent],
  imports: [
    CommonModule,
    LabelRoutingModule,
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
export class LabelModule {}
