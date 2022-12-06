import {
  Component,
  HostListener,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription
} from 'rxjs';
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
  @ViewChild(QuickLinksSidenavComponent, { static: true }) quickLinksSidenav!: QuickLinksSidenavComponent;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.displayText;
  profileRoute?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Profile)?.value;
  viewportInnerWidth: number = window.innerWidth;
  screenOrientation: string = window.screen.orientation.type;

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

  loadDisplayName() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _refreshToken: string;
      _tokenExpirationdate: string;
      name?: string
    } = JSON.parse(localStorage.getItem('user_data'));

    if (!userData)
      return null
    return userData.name;
  }

  Navigate(e: any) {
    this.zone.run(() => {
      this.router.navigate([e.currentTarget.dataset.link]);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.viewportInnerWidth = window.innerWidth;
  }

  onLogout() {
    this.quickLinksSidenav.sideNav.close()
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
