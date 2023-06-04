import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { A11yModule } from '@angular/cdk/a11y';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule,
    LoadingSpinnerComponent,
    SnackbarComponent,
    A11yModule
  ]
})
export class ReportsModule { }
