import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import CommonConstants from '../../common-constants';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { IAuthResponse } from '../models/IAuthResponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;

  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.authService.user.subscribe({
      next: (user => {
        this.isAuthenticated = !!user;
      })
    });
  }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.router.navigate([CommonConstants.Landing]);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.displayName;

    let authObservable: Observable<IAuthResponse>;

    this.isLoading = true;
    this.authService.signup(
      email,
      password
    ).subscribe(
      {
        next: (response: IAuthResponse) => {
          this.router.navigate([CommonConstants.Landing]);
          this._snackBar.openFromComponent(
            SnackbarComponent,
            {
              data: 'Signed up successfully',
              duration: 2000
            }
          );
          this.dialog.closeAll();
          this.isLoading = false;
        },
        error: (errorMessage) => {
          this._handleError(errorMessage)
        }
      }
    );
    form.reset();
  }

  private _handleError(errorMessage: string) {
    this.error = errorMessage;
    this.isLoading = false;
    this._snackBar.openFromComponent(
      SnackbarComponent,
      {
        data: this.error,
        duration: 2000
      }
    );
  }
}
