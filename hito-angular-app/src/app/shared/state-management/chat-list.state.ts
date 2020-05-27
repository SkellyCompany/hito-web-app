import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadNextPage, SetChatListMode, LoadLocalUsers } from './chat-list.action';
import { ConversationService } from '../services/conversation.service';
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

  constructor(private paginationService: PaginationService,
              private userService: UserService, private conversationService: ConversationService) {}

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
  SetChatListMode({getState, setState}: StateContext<ChatListStateModel>, {payload}: SetChatListMode) {
    setState({...getState(), chatListMode: payload});
  }

  @Action(LoadLocalUsers)
  LoadLocalUsers({getState, setState}: StateContext<ChatListStateModel>, {payload}: LoadLocalUsers) {
    this.userService.getLocalUsers(payload).subscribe(localUsers => {
      setState({...getState(), localUsers: localUsers});
    });
  }
}
