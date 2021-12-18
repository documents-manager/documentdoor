import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './state/entity-metadata';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EffectsModule } from '@ngrx/effects';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { StateModule } from './state/state.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoreModule } from './core/core.module';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { SearchComponent } from './home/components/search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { CreateEntityMenuComponent } from './home/components/create-entity-menu/create-entity-menu.component';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, CreateEntityMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StateModule,
    CoreModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      appearance: 'line',
      count: 10,
      loadingText: 'ABC',
      theme: {
        'background-color': '#414247'
      }
    }),
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    ExtendedModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
