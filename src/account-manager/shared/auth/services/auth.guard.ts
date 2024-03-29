import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import CommonConstants from "../../common-constants";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard  {
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
                if (!user)
                    return true;
                return false;
            })
        );
    }
}