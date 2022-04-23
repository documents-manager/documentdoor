import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { APP_ENV, Environment } from './environments';

if (environment.production) {
  enableProdMode();
}
fetch(`/assets/config/${environment.configFile}`).then(async res => {
  const env: Environment = await res.json();

  platformBrowserDynamic([{ provide: APP_ENV, useValue: env }])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
