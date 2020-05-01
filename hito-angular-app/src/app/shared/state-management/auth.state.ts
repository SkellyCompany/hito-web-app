import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../models/auth-user';
import { CreateUser, Login, ResetPassword } from './auth.action';

export interface AuthStateModel {
    authUsers: AuthUser[];
}

@State<AuthStateModel>({
    name: 'users'
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Action(CreateUser)
  createUser({getState, patchState}: StateContext<AuthStateModel>, {payload}: CreateUser) {
    try {
      this.authService.createUser(payload);
    } catch (e) {
    }
  }

  @Action(Login)
  login({getState, patchState}: StateContext<AuthStateModel>, {payload}: Login) {
    return this.authService.login(payload);
  }

  @Action(ResetPassword)
  resetPassword({getState, patchState}: StateContext<AuthStateModel>, {payload}: ResetPassword) {
    return this.authService.resetPassword(payload);
  }
}
