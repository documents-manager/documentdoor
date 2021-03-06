import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StateModule } from './state/state.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoreModule } from './core/core.module';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatTreeModule } from '@angular/material/tree';
import { HomeModule } from './home/home.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe)

@NgModule({
  declarations: [AppComponent],

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
    OverlayModule,
    A11yModule,
    MatChipsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
