import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './landing-page/overview/overview.component';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';
import CommonConstants from './shared/common-constants';

const routes: Routes = [
  { path: '', redirectTo: CommonConstants.Landing, pathMatch: 'full' },
  {
    path: CommonConstants.Authenticate,
    component: AuthComponent
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.value,
    canActivate: [AuthGuard],
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.TransactionManagement)?.value,
    canActivate: [AuthGuard],
    loadChildren: () => import('./add-transaction/add-transaction.module').then(m => m.AddTransactionModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Reports)?.value,
    canActivate: [AuthGuard],
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  { path: '**', redirectTo: CommonConstants.Landing, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
