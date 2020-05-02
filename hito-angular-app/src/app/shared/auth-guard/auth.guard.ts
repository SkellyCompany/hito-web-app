import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { AuthState } from '../state-management/auth.state';
import { Select, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.loggedInUser)
  authUser$: Observable<AuthUser>;

  constructor(private router: Router, private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authUser$
      .pipe(
        map(authUser => {
          console.log("1");
          if (authUser === undefined) {
            console.log("2");
            return false;
          }
          console.log("3");
          return true;
        })
      );  }
}
