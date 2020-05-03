import { UserService } from './../services/user.service';
import { ErrorOccurred } from './error.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CreateUser, Login, ResetPassword } from './auth.action';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { routingConstants } from '../constants';

export interface AuthStateModel {
    loggedInUser: User;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      loggedInUser: undefined
    }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(CreateUser)
  createUser({getState, setState, dispatch}: StateContext<AuthStateModel>, {payload}: CreateUser) {
    return this.authService.createUser(payload).then(userCredential => {
      const user: User = {
        uid: userCredential.user.uid,
        username: payload.username,
        email: userCredential.user.email
      };
      this.userService.createUser(user).then(x => {
        this.userService.getUser(user.uid).subscribe(userResult => {
          setState({...getState(), loggedInUser: userResult});
          this.router.navigate(['/' + routingConstants.app]);
        });
      }).catch(error => {
        dispatch(new ErrorOccurred(error));
      });
    });
  }

  @Action(Login)
  login({getState, setState, dispatch }: StateContext<AuthStateModel>, {payload}: Login) {
    return this.authService.login(payload).then(userCredential => {
      this.userService.getUser(userCredential.user.uid).subscribe(userResult => {
        setState({...getState(), loggedInUser: userResult});
        this.router.navigate(['/' + routingConstants.app]);
      });
    }).catch(error => {
      dispatch(new ErrorOccurred(error));
    });
  }

  @Action(ResetPassword)
  resetPassword({dispatch}: StateContext<AuthStateModel>, {payload}: ResetPassword) {
    this.authService.resetPassword(payload).catch(error => {
      dispatch(new ErrorOccurred(error));
      throw new Error(error);
    });
  }
}
