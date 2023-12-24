import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import CommonConstants from "./shared/common-constants";
import { AuthService } from "./shared/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AccountManagerGuard {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            map((user) => {
                const isAuthenticated = !!user;
                if (isAuthenticated)
                    return true
                return this.router.createUrlTree([CommonConstants.Authenticate]);
            })
        );
    }
}