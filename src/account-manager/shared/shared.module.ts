import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './branding/header/header.component';
import { FooterComponent } from './branding/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { QuickLinksSidenavComponent } from './branding/header/quick-links-sidenav/quick-links-sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { AuthModule } from './auth/auth.module';
import { WarningDialog } from './warning/warning.dialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    QuickLinksSidenavComponent,
    SignupComponent,
    PasswordResetComponent,
    WarningDialog
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuickLinksSidenavComponent,
    LoadingSpinnerComponent,
    WarningDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    A11yModule,
    AuthModule,
    RouterModule
  ],
  providers: [DatePipe]
})
export class SharedModule { }
