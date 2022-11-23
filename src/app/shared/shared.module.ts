import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './branding/header/header.component';
import { FooterComponent } from './branding/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { A11yModule } from '@angular/cdk/a11y';
import { QuickLinksSidenavComponent } from './branding/header/quick-links-sidenav/quick-links-sidenav.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    QuickLinksSidenavComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [DatePipe]
})
export class SharedModule { }
