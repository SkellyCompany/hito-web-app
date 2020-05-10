import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FindChatListItems, LoadHistoryData, LoadNextPage, LoadLocalUsersData } from './chat-list.action';
import { ConversationService } from '../services/conversation.service';
import { ChatListItem } from '../models/ui-models/chat-list-item.model';
import { ChatListItemConverter } from '../models/converters/chat-list-item.converter';

export class ChatListStateModel {
  searchedChatListItems: ChatListItem[];
  loadedChatListItems: ChatListItem[];
}

@State<ChatListStateModel>({
  name: 'chatList',
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

  @Action(LoadLocalUsersData)
  LoadLocalChatData({getState, setState}: StateContext<ChatListStateModel>, {payload}: LoadLocalUsersData) {
    this.userService.getLocalUsers().subscribe(users => {
      const chatListItems = ChatListItemConverter.convertUsers(payload, users);
      setState({...getState(), loadedChatListItems: chatListItems});
    });
  }

  @Action(LoadHistoryData)
  LoadHistoryData({getState, setState}: StateContext<ChatListStateModel>, {payload}: LoadHistoryData) {
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
