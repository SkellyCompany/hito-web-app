import { ErrorOccurred } from './error.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../models/auth-user';
import { CreateUser, Login, ResetPassword } from './auth.action';
import { map, catchError } from 'rxjs/operators';

export interface AuthStateModel {
    loggedInUser: AuthUser;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      loggedInUser: undefined
    }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(CreateUser)
  createUser({getState, patchState,  dispatch}: StateContext<AuthStateModel>, {payload}: CreateUser) {
    return this.authService.createUser(payload).pipe(map(authUser => {
      getState().loggedInUser = authUser;
      }),
      catchError(error => {
        dispatch(new ErrorOccurred(error));
        throw new Error(error);
      })
    );
  }

  @Action(Login)
  login({getState, setState, dispatch}: StateContext<AuthStateModel>, {payload}: Login) {
    return this.authService.login(payload).pipe(
      map(authUser => {
      getState().loggedInUser = authUser;
      }),
      catchError(error => {
        dispatch(new ErrorOccurred(error));
        throw new Error(error);
      })
    );
  }

  @Action(ResetPassword)
  resetPassword({getState, patchState, dispatch}: StateContext<AuthStateModel>, {payload}: ResetPassword) {
    this.authService.resetPassword(payload).catch(error => {
      dispatch(new ErrorOccurred(error));
      throw new Error(error);
    });
  }
}
