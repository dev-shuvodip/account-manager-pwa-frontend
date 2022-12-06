import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth/services/auth.service';
import CommonConstants from '../shared/common-constants';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userSubscription!: Subscription;
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;
  user: User;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Profile)?.displayText;

  constructor(
    private router: Router,
    private zone: NgZone,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    })
    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
