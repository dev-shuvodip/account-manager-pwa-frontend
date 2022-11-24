import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './landing-page/overview/overview.component';
import CommonConstants from './shared/common-constants';

const routes: Routes = [
  { path: '', redirectTo: '/Landing', pathMatch: 'full' },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.value,
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.TransactionManagement)?.value,
    loadChildren: () => import('./add-transaction/add-transaction.module').then(m => m.AddTransactionModule)
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Reports)?.value,
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  { path: '**', redirectTo: '/Landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
