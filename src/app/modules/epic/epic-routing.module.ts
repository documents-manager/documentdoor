import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicComponent } from './epic.component';

const routes: Routes = [{ path: '', component: EpicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpicRoutingModule {}
