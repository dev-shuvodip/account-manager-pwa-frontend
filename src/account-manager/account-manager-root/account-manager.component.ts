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
        this.swUpdate.checkForUpdate();
      });
      this.swUpdate.versionUpdates.subscribe(async evt => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            break;
          case 'VERSION_READY':
            if (confirm("You're using an old version of the application. Want to update ?")) {
              window.location.reload();
            }
            break;
          case 'VERSION_INSTALLATION_FAILED':
            break;
        }
      });
    }
  }
}
