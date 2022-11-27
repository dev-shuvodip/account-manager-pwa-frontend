import {
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FirebaseSettings } from "firebase.config";
import { throwError, map, Subject, BehaviorSubject } from "rxjs";
import { catchError, exhaustMap, take, tap } from "rxjs/operators";
import { IAuthResponse } from "../models/IAuthResponse";
import { IRefreshToken } from "../models/IRefreshToken";
import { IUser } from "../../models/IUser";
import { User } from "../../models/User.model";
import { Router } from "@angular/router";
import CommonConstants from "../../common-constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    private _tokenExpirationTimer: any;
    private _tokenExpirationWarningTimer: any;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar,
        public afAuth: AngularFireAuth
    ) { }

    signup(email: string, password: string) {
        const body: IUser = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        return this.httpClient.post<IAuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FirebaseSettings.apiKey}`,
            body
        ).pipe(
            catchError(this._handleError),
            tap(
                (resData: IAuthResponse) => {
                    this._handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        resData.refreshToken,
                        +resData.expiresIn
                    )
                }
            )
        );
    }

    login(email: string, password: string) {
        const body: IUser = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        return this.httpClient.post<IAuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FirebaseSettings.apiKey}`,
            body
        ).pipe(
            catchError(this._handleError),
            tap(
                (resData: IAuthResponse) => {
                    this._handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        resData.refreshToken,
                        +resData.expiresIn
                    )
                }
            )
        );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _refreshToken: string;
            _tokenExpirationdate: string;
        } = JSON.parse(localStorage.getItem('user_data'));

        if (!userData) {
            return;
        }

        const loadedUser = new User
            (
                userData.email,
                userData.id,
                userData._token,
                userData._refreshToken,
                new Date(userData._tokenExpirationdate)
            );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationdate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.afAuth.signOut();
        this.user.next(null);
        localStorage.removeItem('user_data');
        this.router.navigate([CommonConstants.Authenticate]);
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        this._tokenExpirationWarningTimer = null;
        if (this._tokenExpirationWarningTimer) {
            clearTimeout(this._tokenExpirationWarningTimer);
        }
        this._tokenExpirationWarningTimer = null;
    }

    autoLogout(tokenExpirationDuration: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            this.logout();
            this._snackBar.openFromComponent(
                SnackbarComponent,
                {
                    data: 'Current session ended',
                    duration: 2000
                }
            );
        }, tokenExpirationDuration)
        this._tokenExpirationWarningTimer = setTimeout(() => {
            this._snackBar.openFromComponent(
                SnackbarComponent,
                {
                    data: 'Your current session is about to end in 5 minutes',
                    duration: 2000
                }
            );
        }, 300000);
    }

    GoogleAuth() {
        return this.AuthLogin(new GoogleAuthProvider());
    }
    // Auth logic to run auth providers
    async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
        try {
            const result = await this.afAuth
                .signInWithPopup(provider).then(async (response) => {

                    const user = new User(
                        response.user.email,
                        response.user.uid,
                        await response.user.getIdToken().then(token => token),
                        response.user.refreshToken,
                        new Date(new Date().getTime() + 3600 * 1000),
                        response.user.displayName
                    )

                    this.user.next(user);
                    localStorage.setItem('user_data', JSON.stringify(user));
                });
            this._snackBar.openFromComponent(
                SnackbarComponent,
                {
                    data: 'Logged in successfully',
                    duration: 2000
                }
            );
        } catch (error) {
            console.log(error);
            this._snackBar.openFromComponent(
                SnackbarComponent,
                {
                    data: error.message.split(':')[1].split('.')[0],
                    duration: 2000
                }
            );
        }
    }

    private _handleError(_errorResponse: HttpErrorResponse) {
        let message: string = 'An unknown error has occurred';
        if (!_errorResponse.error || !_errorResponse.error.error) {
            const err = new Error(message);
        }

        switch (_errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                message = 'Entered email address is already in use.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                message = "Too many login attempts detected. Try again later.";
                break;
            case 'EMAIL_NOT_FOUND':
                message = "Entered email address or password is invalid.";
                break;
            case 'INVALID_PASSWORD':
                message = "Entered email address or password is invalid.";
                break;
        }

        const err = new Error(message);
        return throwError(() => err);
    }

    private _handleAuthentication(
        email: string,
        localId: string,
        idToken: string,
        refreshToken: string,
        expiresIn: number
    ) {
        const tokenExpirationdate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            email,
            localId,
            idToken,
            refreshToken,
            tokenExpirationdate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('user_data', JSON.stringify(user));
    }
}
