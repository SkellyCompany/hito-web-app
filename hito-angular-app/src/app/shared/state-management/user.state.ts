import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CreateUser, Login, ResetPassword } from './user.action';
import { dispatch } from 'rxjs/internal/observable/pairs';

export interface UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'users'
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {}

  @Action(CreateUser)
  createUser({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser) {
    try {
      this.userService.createUser(payload);
    } catch (e) {
      console.log("HERE!!!");
    }
  }

  @Action(Login)
  login({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser) {
    return this.userService.login(payload);
  }

  @Action(ResetPassword)
  resetPassword({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser) {
    return this.userService.resetPassword(payload);
  }
}
