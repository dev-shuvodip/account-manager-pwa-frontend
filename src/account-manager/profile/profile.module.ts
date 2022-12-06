import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { MaterialModule } from '../material/material.module';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LoadingSpinnerComponent,
    MaterialModule,
    SnackbarComponent
  ]
})
export class ProfileModule { }
