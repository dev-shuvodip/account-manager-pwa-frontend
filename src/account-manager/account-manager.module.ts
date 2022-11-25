import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './account-manager-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { A11yModule } from '@angular/cdk/a11y';

import { AccountManagerComponent } from './account-manager-root/account-manager.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AccountManagerComponent
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
})
export class AccountManagerModule {
  constructor(private injector: Injector, private router: Router) { }

  ngDoBootstrap() {
    const el = createCustomElement(AccountManagerComponent, { injector: this.injector });
    customElements.define('account-manager-root', el);
    this.router.initialNavigation();
  }
}
