import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import CommonConstants from 'src/account-manager/shared/common-constants';
import { SnackbarComponent } from 'src/account-manager/shared/snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
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
    this.isLoading = true;
    this.authService.passwordReset(email).subscribe({
      next: () => {
        this._snackBar.openFromComponent(
          SnackbarComponent,
          {
            data: 'Initialized password reset. Please check your mail',
            duration: 3000,

          }
        );
        this.dialog.closeAll();
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this._handleError(errorMessage)
      }
    })
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
