import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  serverConfig: {
    root: 'http://localhost:8081/api',
    timeout: 3000
  }
};
