import { DefaultDataServiceConfig } from '@ngrx/data';

export interface Environment {
  production: boolean;
  serverConfig: DefaultDataServiceConfig;
}
