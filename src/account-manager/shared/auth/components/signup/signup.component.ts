import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import CommonConstants from '../../../common-constants';
import { SnackbarComponent } from '../../../snackbar/snackbar.component';
import { IAuthResponse } from '../../models/IAuthResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  hide: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;
  viewportInnerWidth: number = window.innerWidth;

  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const displayName = form.value.displayName;
    this.isLoading = true;
    this.authService.signup(
      email,
      password,
      displayName
    ).subscribe(
      {
        next: (response) => {
          if (response[0].emailVerified) {
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
          } else {
            this._snackBar.openFromComponent(
              SnackbarComponent,
              {
                data: 'A verification mail has been sent to your mailbox. Please respond to it to verify your email',
                duration: 5000
              }
            );

            this.dialog.closeAll();
            this.isLoading = false;
          }
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
        duration: 2000,

      }
    );

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.viewportInnerWidth = window.innerWidth;
  }

  ngOnDestroy(): void { }
}
