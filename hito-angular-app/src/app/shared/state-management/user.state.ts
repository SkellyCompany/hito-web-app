import { UserService } from './../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FindUser } from './user.action';
import { User } from '../models/user.model';

export class UserStateModel {
  searchedUsers: User[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    searchedUsers: undefined
   }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {}

  @Selector()
  static searchedUsers(state: UserStateModel) {
    return state.searchedUsers;
  }

  @Action(FindUser)
  findUser({ getState, setState }: StateContext<UserStateModel>, {payload}: FindUser) {
    return this.userService.findUser(payload).subscribe(userResult => {
      setState({...getState(), searchedUsers: userResult});
    });
  }
}
