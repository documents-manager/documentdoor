import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [WithLoadingPipe],
  exports: [WithLoadingPipe],
  imports: [CommonModule, ReactiveComponentModule]
})
export class CoreModule {}
