import {
    CommonModule,
    NgFor,
    NgIf
} from "@angular/common";
import {
    HttpClient,
    HttpClientModule
} from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MaterialModule } from "src/account-manager/material/material.module";
import CommonConstants from "../common-constants";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { IAuthResponse } from "./models/IAuthResponse";
import { AuthService } from "./services/auth.service";
import { SignupComponent } from "./components/signup/signup.component";
import { PasswordResetComponent } from "./components/password-reset/password-reset.component";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})

export class AuthComponent implements OnInit {
    hide: boolean = true;
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string | null = null;
    isAuthenticated: boolean = false;
    logoURL = "";

    constructor(
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.authService.user.subscribe({
            next: (user => {
                this.isAuthenticated = !!user;
                if (this.isAuthenticated) {
                    this.router.navigate([CommonConstants.Landing]);
                }
            })
        });

        this.matIconRegistry.addSvgIcon(
            "logo",
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoURL));
    }


    ngOnInit(): void { }

    onModeSwitch() {
        this.isLoginMode = !this.isLoginMode;
        this.openSignUpDialog();
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        this.authService.login(email, password).subscribe(
            {
                next: (response: IAuthResponse) => {
                    this.router.navigate([CommonConstants.Landing]);
                    this.isLoading = false;
                    this._snackBar.openFromComponent(
                        SnackbarComponent,
                        {
                            data: 'Logged in successfully',
                            duration: 2000
                        }
                    );
                },
                error: (errorMessage) => {
                    this._handleError(errorMessage)
                }
            }
        );
        form.reset();
    }

    async loginWithGoogle() {
        this.isLoading = true;
        await this.authService.GoogleAuth().then(() => {
            this.router.navigate([CommonConstants.Landing]);
            this.isLoading = false;
        });
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

    openSignUpDialog() {
        this.dialog.open(SignupComponent, {
            backdropClass: 'signUpBackdrop',
            hasBackdrop: true
        });
        window.document.querySelector<any>('.signUpBackdrop').parentNode.style.zIndex = "9999";
    }

    openPasswordResetDialog() {
        this.dialog.open(PasswordResetComponent, {
            backdropClass: 'passwordResetBackdrop',
            hasBackdrop: true
        });
        window.document.querySelector<any>('.passwordResetBackdrop').parentNode.style.zIndex = "9999";
    }
}