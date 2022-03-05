import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { TreeNavComponent } from './home/components/tree-nav/tree-nav.component';
import { MatTreeModule } from '@angular/material/tree';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, CreateEntityMenuComponent, TreeNavComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StateModule,
    CoreModule,
    HttpClientModule,
    HomeModule,
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
