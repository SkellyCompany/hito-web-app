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
  loggedInUser$: Observable<AuthUser>;

  constructor(private store: Store) {}

  canActivate() {
      return this.loggedInUser$
      .pipe(
        map(loggedInUser => {
          if (loggedInUser === null) {
            return false;
          }
          return true;
      }));
    }
}
