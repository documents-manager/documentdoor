import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloneDeepPipe } from './clone-deep.pipe';

const pipes = [CloneDeepPipe];

@NgModule({
  declarations: pipes,
  exports: pipes,
  imports: [CommonModule]
})
export class SharedPipesModule {}
