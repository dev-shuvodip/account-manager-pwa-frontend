import {
    CommonModule,
    NgFor,
    NgIf
} from "@angular/common";
import {
    HttpClient,
    HttpClientModule
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MaterialModule } from "src/account-manager/material/material.module";
import CommonConstants from "../common-constants";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { IAuthResponse } from "./models/IAuthResponse";
import { AuthService } from "./services/auth.service";

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

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
        this.authService.user.subscribe({
            next: (user => {
                this.isAuthenticated = !!user;
            })
        })
    }

    ngOnInit(): void {
        if (this.isAuthenticated) {
            this.router.navigate([CommonConstants.Landing]);
        }
    }

    onModeSwitch() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<IAuthResponse>;

        this.isLoading = true;
        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(
                {
                    next: (response: IAuthResponse) => {
                        this.isLoading = false;
                        this._snackBar.openFromComponent(
                            SnackbarComponent,
                            {
                                data: 'Logged in successfully',
                                duration: 2000
                            }
                        );
                        this.router.navigate([CommonConstants.Landing]);
                    },
                    error: (errorMessage) => {
                        this._handleError(errorMessage)
                    }
                }
            );
        } else {
            this.authService.signup(email, password).subscribe(
                {
                    next: (response: IAuthResponse) => {
                        this.isLoading = false;
                        this._snackBar.openFromComponent(
                            SnackbarComponent,
                            {
                                data: 'Signed up successfully',
                                duration: 2000
                            }
                        );
                        this.router.navigate([CommonConstants.Landing]);
                    },
                    error: (errorMessage) => {
                        this._handleError(errorMessage)
                    }
                }
            );
        }
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