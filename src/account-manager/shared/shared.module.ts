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
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    QuickLinksSidenavComponent
  ],
  exports: [
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    QuickLinksSidenavComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe]
})
export class SharedModule { }
