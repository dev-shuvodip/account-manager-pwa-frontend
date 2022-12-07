import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerGuard } from '../account-manager.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AccountManagerGuard],
    loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
