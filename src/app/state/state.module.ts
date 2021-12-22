import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {DefaultDataServiceConfig, EntityDataModule} from '@ngrx/data';
import {entityConfig} from './entity-metadata';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SearchEffects} from './search/search.effects';
import {ReactiveComponentModule} from '@ngrx/component';
import {LabelEffects} from './effects/label.effects';
import {EpicEffects} from './effects/epic.effects';
import {CreationDialogsModule} from "../shared/creation-dialogs/creation-dialogs.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects, LabelEffects, EpicEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    ReactiveComponentModule,
    CreationDialogsModule
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: environment.serverConfig }]
})
export class StateModule {}
