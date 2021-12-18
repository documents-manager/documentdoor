import { HttpErrorResponse } from '@angular/common/http';

export interface LoadingState<T> {
  loading: boolean;
  value?: T;
  error?: Error | HttpErrorResponse;
}
