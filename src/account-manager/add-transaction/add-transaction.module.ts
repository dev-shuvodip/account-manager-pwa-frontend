import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MaterialModule } from '../material/material.module';

import { AddTransactionRoutingModule } from './add-transaction-routing.module';
import { AddTransactionComponent } from './add-transaction.component';


@NgModule({
  declarations: [
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    AddTransactionRoutingModule,
    MaterialModule
  ],
  providers: []
})
export class AddTransactionModule { }
