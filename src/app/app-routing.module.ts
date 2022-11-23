import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './landing-page/overview/overview.component';
import CommonConstants from './shared/common-constants';

const routes: Routes = [
  { path: '', redirectTo: '/Landing', pathMatch: 'full' },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.value, children:
      [
        {
          path: '',
          loadChildren: () => import('./landing-page/overview/overview.component').then(m => m.OverviewComponent)
        },
      ]
  },
  {
    path: CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.AddTransaction)?.value,
    loadChildren: () => import('./add-transaction/add-transaction.module').then(m => m.AddTransactionModule)
  },
  { path: '**', redirectTo: '/Landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, relativeLinkResolution:'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
