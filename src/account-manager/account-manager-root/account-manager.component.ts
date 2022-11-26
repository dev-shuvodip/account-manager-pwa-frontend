import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AuthService } from '../shared/auth/services/auth.service';

@Component({
  selector: 'account-manager-root',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent {

  constructor(
    private swUpdate: SwUpdate,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
    if (this.swUpdate.isEnabled) {
      interval(600000).subscribe(() => {
        console.log('UpdateService: Checking for Updates')
        this.swUpdate.checkForUpdate();
      });

      this.swUpdate.versionUpdates.subscribe(async evt => {
        console.log('UpdateService: versionUpdates', evt);
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            if (confirm("You're using an old version of the control panel. Want to update?")) {
              window.location.reload();
            }
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
        }
      });
    }
  }
}