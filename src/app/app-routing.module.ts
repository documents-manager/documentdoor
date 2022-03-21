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
  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
