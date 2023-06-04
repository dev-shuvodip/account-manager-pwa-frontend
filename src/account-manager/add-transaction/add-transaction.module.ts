import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTransactionRoutingModule } from './add-transaction-routing.module';
import { AddTransactionComponent } from './add-transaction.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@NgModule({
  declarations: [
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    AddTransactionRoutingModule,
    MaterialModule,
    LoadingSpinnerComponent,
    SnackbarComponent,
    A11yModule
  ],
  providers: []
})
export class AddTransactionModule { }
