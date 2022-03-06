import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'epic',
    loadChildren: () => import('./pages/epic/epic.module').then(m => m.EpicModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  { path: 'label', loadChildren: () => import('./pages/label/label.module').then(m => m.LabelModule) },
  { path: 'table', loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
