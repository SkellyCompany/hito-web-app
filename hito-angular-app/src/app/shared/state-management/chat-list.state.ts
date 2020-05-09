import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FindChatListItems, InitHistoryData, LoadNextPage, InitLocalUsersData } from './chat-list.action';
import { ConversationService } from '../services/conversation.service';
import { ChatListItem } from '../models/chat-list-item.model';
import { ChatListItemConverter } from '../models/converters/chat-list-item.converter';

export class ChatListStateModel {
  searchedChatListItems: ChatListItem[];
  loadedChatListItems: ChatListItem[];
}

@State<ChatListStateModel>({
  name: 'user',
  defaults: {
    searchedChatListItems: undefined,
    loadedChatListItems: undefined
   }
})

@Injectable()
export class ChatListState {

  constructor(private userService: UserService, private conversationService: ConversationService) {}

  @Selector()
  static searchedChatListItems(state: ChatListStateModel) {
    return state.searchedChatListItems;
  }

  @Selector()
  static loadedChatListItems(state: ChatListStateModel) {
    return state.loadedChatListItems;
  }

  // @Action(InitLocalUsersData)
  // InitLocalChatData({getState, setState}: StateContext<ChatListStateModel>) {
  //   this.userService.getLocalUsers().subscribe(users => {
  //     //Convert users to chat-list-items function
  //     setState({...getState(), loadedChatListItems: users});
  //   });
  // }

  @Action(InitHistoryData)
  InitHistoryData({getState, setState}: StateContext<ChatListStateModel>, {payload}: InitHistoryData) {
    this.conversationService.getUsersConversations(payload).subscribe(conversations => {
      const chatListItems = ChatListItemConverter.convertConversations(payload, conversations);
      setState({...getState(), loadedChatListItems: chatListItems});
    });
  }

  @Action(LoadNextPage)
  LoadNextPage({}: StateContext<ChatListStateModel>) {
    // this.paginationService.loadNextPage();
  }

  // @Action(FindChatListItems)
  // findChatListItems({ getState, setState }: StateContext<ChatListStateModel>, {payload}: FindChatListItems) {
  //   return this.userService.findUser(payload).subscribe(userResult => {
  //     setState({...getState(), searchedChatListItems: userResult});
  //   });
  // }
}
