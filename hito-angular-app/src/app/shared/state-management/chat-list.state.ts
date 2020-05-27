import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadNextPage, SetChatListMode, LoadLocalUsers } from './chat-list.action';
import { ChatListMode } from '../global-enums/chat-list-mode.enum';
import { PaginationService } from '../services/pagination.service';
import { User } from '../models/data-models/user.model';

export class ChatListStateModel {
  localUsers: User[];
  chatListMode: ChatListMode;
}

@State<ChatListStateModel>({
  name: 'chatList',
  defaults: {
    localUsers: undefined,
    chatListMode: undefined
   }
})

@Injectable()
export class ChatListState {

  constructor(private paginationService: PaginationService, private userService: UserService,) {}

  @Selector()
  static localUsers(state: ChatListStateModel) {
    return state.localUsers;
  }

  @Selector()
  static chatListMode(state: ChatListStateModel) {
    return state.chatListMode;
  }

  @Action(LoadNextPage)
  LoadNextPage({}: StateContext<ChatListStateModel>) {
    this.paginationService.loadNextPage();
  }

  @Action(SetChatListMode)
  SetChatListMode({getState, setState}: StateContext<ChatListStateModel>, {chatListMode}: SetChatListMode) {
    setState({...getState(), chatListMode: chatListMode});
  }

  @Action(LoadLocalUsers)
  LoadLocalUsers({getState, setState}: StateContext<ChatListStateModel>, {loggedInUid}: LoadLocalUsers) {
    this.userService.getLocalUsers(loggedInUid).subscribe(localUsers => {
      setState({...getState(), localUsers: localUsers});
    });
  }
}
