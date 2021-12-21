import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { LoadingState } from '../models';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(val: Observable<T>): Observable<LoadingState<T>> {
    return val.pipe(
      map((value: any) => ({ loading: false, value })),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error }))
    );
  }
}
