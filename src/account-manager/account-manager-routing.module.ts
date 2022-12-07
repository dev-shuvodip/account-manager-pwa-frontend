import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerGuard } from './account-manager.guard';
import CommonConstants from './shared/common-constants';
import { AuthGuard } from './shared/auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: CommonConstants.Landing,
    pathMatch: 'full'
  },
  {
    path: CommonConstants.Authenticate,
    canActivate: [AuthGuard],
    loadChildren: () => import('./shared/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.value,
    canActivate: [AccountManagerGuard],
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.TransactionManagement)?.value,
    canActivate: [AccountManagerGuard],
    loadChildren: () => import('./add-transaction/add-transaction.module').then(m => m.AddTransactionModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Reports)?.value,
    canActivate: [AccountManagerGuard],
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '**',
    redirectTo: CommonConstants.Landing,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AccountManagerRoutingModule { }
