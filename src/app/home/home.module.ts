import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEntityMenuComponent } from './components/create-entity-menu/create-entity-menu.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [HomeComponent, CreateEntityMenuComponent, SearchComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    FlexModule,
    ReactiveComponentModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
