import { PaginationService } from './../services/pagination.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Init, LoadNextPage } from './pagination.action';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

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

  @Action(Init)
  init({getState, setState}: StateContext<PaginationStateModel>, {payload}: Init) {
    this.paginationService.init(payload).subscribe(userResult => {
      setState({...getState(), loadedUsers: userResult});
    });
  }

  @Action(LoadNextPage)
  loadNextPage({}: StateContext<PaginationStateModel>) {
    this.paginationService.loadNextPage();
  }
}
