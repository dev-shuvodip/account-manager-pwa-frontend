import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MaterialModule } from '../../material/material.module';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        A11yModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingSpinnerComponent,
        SnackbarComponent
    ],
    providers: []
})
export class AuthModule { }
