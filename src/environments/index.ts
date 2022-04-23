import { InjectionToken } from '@angular/core';

interface Environment {
  root: string;
  timeout: number;
}

interface EnvironmentConfig {
  production: boolean;
  configFile: string;
}

const APP_ENV = new InjectionToken<Environment>('app.env');

export { APP_ENV, Environment, EnvironmentConfig };
