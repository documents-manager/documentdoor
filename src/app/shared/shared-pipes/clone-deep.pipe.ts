import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';

@Pipe({
  name: 'cloneDeep'
})
export class CloneDeepPipe implements PipeTransform {
  transform<T>(value: T): T {
    return cloneDeep(value);
  }
}
