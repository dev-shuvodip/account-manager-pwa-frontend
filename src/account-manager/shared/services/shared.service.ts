import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseSettings } from 'firebase.config';
import { BehaviorSubject, Subject } from 'rxjs';
import { IGetUserResponse } from '../auth/models/IGetUserResponse';
import CommonConstants from '../common-constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    public afAuth: AngularFireAuth
  ) { }

  public async GetRoutes(): Promise<{ key?: string, value?: string }[]> {
    let moduleRoutes: any;
    await import('../common-constants').then(response => moduleRoutes = response.default.ModulesRoutes);
    return moduleRoutes;
  }

  /**
     * Gets a user's data by issuing an HTTP POST request to the Auth `getAccountInfo` endpoint.
     * 
     * @param idToken The idToken issued for the user.
     *
     * @return  An `Observable` of the `IGetUserResponse` for the request, with a response body in the
     * requested type.
     */
  getUser(idToken: string) {
    const body = {
      idToken: idToken
    }

    return this.httpClient.post<IGetUserResponse>(
      `${CommonConstants.getAccountInfo}?key=${FirebaseSettings.apiKey}`,
      body
    )
  }
}
