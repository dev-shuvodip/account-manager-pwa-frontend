import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountManagerRoutingModule } from './account-manager-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { A11yModule } from '@angular/cdk/a11y';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { AccountManagerComponent } from './account-manager-root/account-manager.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseSettings } from 'firebase.config';

@NgModule({
  declarations: [
    AccountManagerComponent
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  imports: [
    BrowserModule,
    AccountManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(FirebaseSettings),
    AngularFireAuthModule,
  ]
})
export class AccountManagerModule {
  constructor(
    private injector: Injector,
    private router: Router) { }

  ngDoBootstrap() {
    const el = createCustomElement(AccountManagerComponent, { injector: this.injector });
    customElements.define('account-manager-root', el);
    this.router.initialNavigation();
  }
}
