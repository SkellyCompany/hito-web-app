import { PaginationService } from './../services/pagination.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadNextPage, InitLocalChatData, InitHistoryData } from './pagination.action';
import { User } from '../models/user.model';

export class PaginationStateModel {
  loadedUsers: User[];
}

@State<PaginationStateModel>({
  name: 'pagination',
  defaults: {
    loadedUsers: undefined
  }
})


@Injectable()
export class PaginationState {

  constructor(private paginationService: PaginationService) {}

  @Selector()
  static loadedUsers(state: PaginationStateModel) {
    return state.loadedUsers;
  }

  @Action(InitLocalChatData)
  InitLocalChatData({getState, setState}: StateContext<PaginationStateModel>, {payload}: InitLocalChatData) {
    this.paginationService.initLocalChatData(payload).subscribe(userResult => {
      setState({...getState(), loadedUsers: userResult});
    });
  }

  @Action(InitHistoryData)
  InitHistoryData({getState, setState}: StateContext<PaginationStateModel>, {payload}: InitHistoryData) {
    this.paginationService.initHistoryData(payload).subscribe(userResult => {
      setState({...getState(), loadedUsers: userResult});
    });
  }

  @Action(LoadNextPage)
  LoadNextPage({}: StateContext<PaginationStateModel>) {
    this.paginationService.loadNextPage();
  }
}
