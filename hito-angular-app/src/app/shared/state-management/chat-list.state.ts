import { firestoreCollectionsConstants } from './../constants';
import { PaginationQuery } from './../models/ui-models/pagination-query.model';
import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FindChatListItems, LoadHistoryData, LoadNextPage, LoadLocalUsersData, SetChatListMode } from './chat-list.action';
import { ConversationService } from '../services/conversation.service';
import { ChatListItem } from '../models/ui-models/chat-list-item.model';
import { ChatListItemConverter } from '../models/converters/chat-list-item.converter';
import { ChatListMode } from '../global-enums/chat-list-mode.enum';
import { PaginationService } from '../services/pagination.service';

export class ChatListStateModel {
  searchedChatListItems: ChatListItem[];
  loadedChatListItems: ChatListItem[];
  chatListMode: ChatListMode;
}

@State<ChatListStateModel>({
  name: 'chatList',
  defaults: {
    searchedChatListItems: undefined,
    loadedChatListItems: undefined,
    chatListMode: undefined
   }
})

@Injectable()
export class ChatListState {

  constructor(private paginationService: PaginationService,
              private userService: UserService, private conversationService: ConversationService) {}

  @Selector()
  static searchedChatListItems(state: ChatListStateModel) {
    return state.searchedChatListItems;
  }

  @Selector()
  static loadedChatListItems(state: ChatListStateModel) {
    return state.loadedChatListItems;
  }

  @Selector()
  static chatListMode(state: ChatListStateModel) {
    return state.chatListMode;
  }

  @Action(LoadLocalUsersData)
  LoadLocalChatData({getState, setState}: StateContext<ChatListStateModel>, {payload}: LoadLocalUsersData) {
    // const paginationQuery: PaginationQuery = {path: firestoreCollectionsConstants.users, field: 'username'};
    // this.paginationService.initLocalChatData(paginationQuery).subscribe(users => {
    //   const chatListItems = ChatListItemConverter.convertUsers(payload, users);
    //   setState({...getState(), loadedChatListItems: chatListItems});
    // });
    this.userService.getLocalUsers().subscribe(users => {
      const chatListItems = ChatListItemConverter.convertUsers(payload, users);
      setState({...getState(), loadedChatListItems: chatListItems});
    });
  }

  @Action(LoadHistoryData)
  LoadHistoryData({getState, setState}: StateContext<ChatListStateModel>, {payload}: LoadHistoryData) {
    // const paginationQuery: PaginationQuery = {path: firestoreCollectionsConstants.conversations, field: 'id'};
    // this.paginationService.initLocalChatData(paginationQuery).subscribe(conversations => {
    //   const chatListItems = ChatListItemConverter.convertConversations(payload, conversations);
    //   setState({...getState(), loadedChatListItems: chatListItems});
    // });
    this.conversationService.getUsersConversations(payload).subscribe(conversations => {
      const chatListItems = ChatListItemConverter.convertConversations(payload, conversations);
      setState({...getState(), loadedChatListItems: chatListItems});
    });
  }

  @Action(LoadNextPage)
  LoadNextPage({}: StateContext<ChatListStateModel>) {
    this.paginationService.loadNextPage();
  }

  @Action(SetChatListMode)
  SetChatListMode({getState, setState, dispatch}: StateContext<ChatListStateModel>, {payload, loggedInUserUsername}: SetChatListMode) {
    // if (payload === ChatListMode.LOCAL_GROUPS) {
        // Call loadGroups function
    // }
    if (payload === ChatListMode.LOCAL_USERS) {
      dispatch(new LoadLocalUsersData(loggedInUserUsername));
    } else {
      dispatch(new LoadHistoryData(loggedInUserUsername));
    }
    setState({...getState(), chatListMode: payload});
  }

  @Action(FindChatListItems)
  FindChatListItems({ getState, setState }: StateContext<ChatListStateModel>, {payload, searchedUser}: FindChatListItems) {
    // if (getState().chatListMode === ChatListMode.LOCAL_GROUPS) {
        // Call findGroups function
    // }
    if (getState().chatListMode === ChatListMode.LOCAL_USERS) {
      this.userService.findUsers(searchedUser).subscribe(users => {
        console.log(users);
        const chatListItems = ChatListItemConverter.convertUsers(payload, users);
        console.log(chatListItems);
        setState({...getState(), searchedChatListItems: chatListItems});
      });
    } else {
      this.conversationService.findConversations(searchedUser).subscribe(conversations => {
        const chatListItems = ChatListItemConverter.convertConversations(payload, conversations);
        setState({...getState(), searchedChatListItems: chatListItems});
      });
    }
  }
}
