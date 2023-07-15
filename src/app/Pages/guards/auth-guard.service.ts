import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    |Observable<boolean | UrlTree>
    |Promise<boolean | UrlTree>
    |boolean
    |UrlTree{
        return new Promise(resolve => 
            this.authService.CheckToken().then((x) => {
                this.authService.UsuarioEstaAutenticado().then(status => {
                    let redirect: string = state.root.queryParams['redirect'];
                    let blnUnAuthorize = false;

                    //validation
                    if(status === false)
                    blnUnAuthorize = true;

                    //redirect
                    if(blnUnAuthorize && redirect != null && redirect.length > 0)
                    this.router.navigate(["login", {redirect}]);
                    else if(blnUnAuthorize)
                    this.router.navigate(["login"]);

                    resolve(status);
                })
                .catch(() => {
                    this.router.navigate(["login"]);
                    resolve(false)
                })
            }))
    }
}