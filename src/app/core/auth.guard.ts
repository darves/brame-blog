import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUserService } from '../app-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appUserService.isLoggedin
      .pipe(
        tap((isLoggedIn) => {
          if (!isLoggedIn) {
            // if not loggedin - go to dashboard;
            this.router.navigateByUrl('/');
          }
        })
      );
  }

  constructor(private appUserService: AppUserService, private router: Router) {}

}
