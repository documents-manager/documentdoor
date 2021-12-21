import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SearchEffects } from './search/search.effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { LabelEffects } from './effects/label.effects';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [MatDialogModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects, LabelEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    ReactiveComponentModule,
    ...materialModules
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: environment.serverConfig }]
})
export class StateModule {}
