import {
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FirebaseSettings } from "firebase.config";
import {
    throwError,
    map,
    Subject,
    BehaviorSubject,
    Observable,
    forkJoin
} from "rxjs";
import {
    catchError,
    exhaustMap,
    switchMap,
    take,
    tap
} from "rxjs/operators";
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
import { IUserUpdateResponse } from "../models/IUserUpdateResponse";

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

    /**
     * Creates a new user with provided `email` `password` and `name`
     * by issuing an HTTP POST request to the Auth `signupNewUser` endpoint.
     * and returns an observable of the response.
     *
     * @param email The user email.
     * @param password The user password.
     * @param displayName The user's display name
     *
     * @return  An `Observable` of the `[IUserUpdateResponse]` for the request, with a response body in the
     * requested type.
     */
    signup(email: string, password: string, displayName: string) {
        const body: IUser = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        var signUpResponseSignature: IAuthResponse = {
            idToken: "",
            email: "",
            refreshToken: "",
            expiresIn: "",
            localId: "",
            displayName: ""
        }
        return this.httpClient.post<IAuthResponse>(
            `${CommonConstants.signupNewUser}?key=${FirebaseSettings.apiKey}`,
            body
        ).pipe(
            catchError(this._handleError),
            switchMap((signUpResponse) => {
                signUpResponseSignature = signUpResponse;
                const updateUserRequest = this.updateUser(
                    signUpResponse.idToken,
                    displayName,
                    [],
                    false
                );
                return forkJoin([updateUserRequest]);
            }),
            tap(forkJoinResponse => {
                this._handleAuthentication(
                    signUpResponseSignature.email,
                    signUpResponseSignature.localId,
                    signUpResponseSignature.idToken,
                    signUpResponseSignature.refreshToken,
                    +signUpResponseSignature.expiresIn,
                    forkJoinResponse[0].displayName
                )
            })
        );
    }

    /**
     * Logs in a user with provided `email` and `password`
     * by issuing an HTTP POST request to the Auth `verifyPassword ` endpoint.
     * and returns an observable of the response.
     *
     * @param email The user email.
     * @param password The user password.
     *
     * @return  An `Observable` of the `IAuthResponse` for the request, with a response body in the
     * requested type.
     */
    login(email: string, password: string) {
        const body: IUser = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        return this.httpClient.post<IAuthResponse>(
            `${CommonConstants.verifyPassword}?key=${FirebaseSettings.apiKey}`,
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
                        +resData.expiresIn,
                        resData.displayName
                    )
                }
            )
        );
    }

    /**
     * Updates user based on provided parameters
     * by issuing an HTTP POST request to the Auth `setAccountInfo ` endpoint.
     * and returns an observable of the response.
     *
     * @param idToken The id token issued for the current user.
     * @param _name The name of the current user.
     * @param _deleteAttribute List of attributes to delete, `DISPLAY_NAME` or `PHOTO_URL`. This will nullify these values.
     * @param _returnSecureToken Whether or not to return an ID and refresh token.
     *
     * @return  An `Observable` of the `IUserUpdateResponse` for the request, with a response body in the
     * requested type.
     */
    updateUser(
        idToken: string,
        _name: string,
        _deleteAttribute?: string[],
        _returnSecureToken?: boolean
    ): Observable<IUserUpdateResponse> {
        const body = {
            idToken: idToken,
            displayName: _name,
            deleteAttribute: _deleteAttribute,
            returnSecureToken: _returnSecureToken
        }
        return this.httpClient.post<IUserUpdateResponse>(
            `${CommonConstants.setAccountInfo}?key=${FirebaseSettings.apiKey}`,
            body
        )
    }

    /**
     * Automatically logs in the current user on load of application
     * based on the id token expiraion duration
     *
     */
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _refreshToken: string;
            _tokenExpirationdate: string;
            _name: string;
        } = JSON.parse(localStorage.getItem('user_data'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            userData._refreshToken,
            new Date(userData._tokenExpirationdate),
            userData._name
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationdate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    /**
     * Refresh a `Firebase ID token` by issuing an HTTP POST request to the `securetoken.googleapis.com` endpoint.
     *
     * @param _refreshToken The refresh token.
     *
     * @return  An `Observable` of the `IRefreshToken` for the request, with a response body in the
     * requested type.
     */
    refreshToken(_refreshToken: string) {
        const body = {
            grant_type: "refresh_token",
            refresh_token: _refreshToken
        };
        return this.httpClient.post<IRefreshToken>(
            `${CommonConstants.refreshToken}?key=${FirebaseSettings.apiKey}`,
            body
        )
    }

    /**
     * Logs out the current user
     *
     */
    logout() {
        this.afAuth.signOut();
        this.user.next(null);
        localStorage.removeItem('user_data');
        this.router.navigate([CommonConstants.Authenticate]);
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        this._tokenExpirationTimer = null;
        if (this._tokenExpirationWarningTimer) {
            clearTimeout(this._tokenExpirationWarningTimer);
        }
        this._tokenExpirationWarningTimer = null;
    }

    /**
     * Automatically logs out the current user on load of application
     * on expiration of id token
     *
     */
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
        }, tokenExpirationDuration - 300000);
    }

    /**
     * Service to initiate Google Authentication
     *
     */
    GoogleAuth() {
        return this.AuthLogin(new GoogleAuthProvider());
    }

    /**
     * Initiates Authentication using `Google Auth Provider`
     *
     */
    async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
        try {
            const result = await this.afAuth
                .signInWithPopup(provider).then(
                    async (response) => {
                        const user = new User(
                            response.user.email,
                            response.user.uid,
                            await response.user.getIdToken().then(token => token),
                            response.user.refreshToken,
                            new Date((await response.user.getIdTokenResult()).expirationTime),
                            response.user.displayName
                        )

                        this.user.next(user);
                        this.autoLogout(
                            new Date((await response.user.getIdTokenResult()).expirationTime).getTime() - new Date().getTime()
                        );
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
            this._snackBar.openFromComponent(
                SnackbarComponent,
                {
                    data: error.message.split(':')[1].split('.')[0],
                    duration: 2000
                }
            );
        }
    }

    /**
     * Unsuccessful authentication handler
     *
     */
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

    /**
     * Successful authentication handler
     *
     */
    private _handleAuthentication(
        email: string,
        localId: string,
        idToken: string,
        refreshToken: string,
        expiresIn: number,
        _name: string
    ) {
        const tokenExpirationdate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            email,
            localId,
            idToken,
            refreshToken,
            tokenExpirationdate,
            _name
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('user_data', JSON.stringify(user));
    }
}
