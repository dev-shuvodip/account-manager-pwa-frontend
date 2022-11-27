import {
  Component,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import CommonConstants from '../../common-constants';
import { SharedService } from '../../services/shared.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { QuickLinksSidenavComponent } from './quick-links-sidenav/quick-links-sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription!: Subscription;
  isAuthenticated: boolean = false;
  displayName: string = "";
  @ViewChild(QuickLinksSidenavComponent, { static: true }) quickLinksSidenav!: QuickLinksSidenavComponent;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.displayText;

  constructor(
    private router: Router,
    private zone: NgZone,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  loadUserName(): string {
    if (this.isAuthenticated) {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _refreshToken: string;
        _tokenExpirationdate: string;
        name?: string
      } = JSON.parse(localStorage.getItem('user_data'));
      if (!userData) {
        this.displayName = "";
      } else {
        this.displayName = userData.name;
      }
    }
    return this.displayName;
  }

  Navigate(e: any) {
    this.zone.run(() => {
      this.router.navigate([e.currentTarget.dataset.link]);
    })
  }

  onLogout() {
    this.authService.logout();
    this._snackBar.openFromComponent(
      SnackbarComponent,
      {
        data: 'Logged out successfully',
        duration: 2000
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
