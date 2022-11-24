import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule
  ]
})
export class ReportsModule { }
