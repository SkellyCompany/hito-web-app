import { ChatListItemConverter } from './../models/converters/chat-list-item.converter';
import { UserService } from '../services/user.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadNextPage, SetChatListMode } from './chat-list.action';
import { ConversationService } from '../services/conversation.service';
import { ChatListItem } from '../models/ui-models/chat-list-item.model';
import { ChatListMode } from '../global-enums/chat-list-mode.enum';
import { PaginationService } from '../services/pagination.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export class ChatListStateModel {
  loadedChatListItems: ChatListItem[];
  chatListMode: ChatListMode;
}

@State<ChatListStateModel>({
  name: 'chatList',
  defaults: {
    loadedChatListItems: undefined,
    chatListMode: undefined
   }
})

@Injectable()
export class ChatListState {

  private localChatSubsctription: Subscription;
  private historyChatSubscription: Subscription;

  constructor(private paginationService: PaginationService,
              private userService: UserService, private conversationService: ConversationService) {}

  @Selector()
  static loadedChatListItems(state: ChatListStateModel) {
    return state.loadedChatListItems;
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
  SetChatListMode({getState, setState}: StateContext<ChatListStateModel>, {payload, loggedInUserUsername}: SetChatListMode) {
    this.unsubscribeChatLists();
    // if (payload === ChatListMode.LOCAL_GROUPS) {
        // Call loadGroups function
    // }
    if (payload === ChatListMode.LOCAL_USERS) {
      this.localChatSubsctription = this.getLocalChatList(loggedInUserUsername).subscribe(chatListItems => {
        setState({...getState(), loadedChatListItems: chatListItems});
      });
    } else {
      this.historyChatSubscription = this.getHistoryChatList(loggedInUserUsername).subscribe(chatListItems => {
        setState({...getState(), loadedChatListItems: chatListItems});
      });
    }
    setState({...getState(), chatListMode: payload});
  }

  private unsubscribeChatLists() {
    if(this.localChatSubsctription !== undefined) {
      this.localChatSubsctription.unsubscribe();
    }
    if(this.historyChatSubscription !== undefined) {
      this.historyChatSubscription.unsubscribe();
    }
  }

  private getLocalChatList(username: string): Observable<ChatListItem[]> {
    return this.userService.getLocalUsers().pipe(map(users => {
      return ChatListItemConverter.convertUsers(username, users);
    }));
    // this.userService.getLocalUsers().subscribe(users => {
    //   const chatListItems = ChatListItemConverter.convertUsers(payload, users);
    //   setState({...getState(), loadedChatListItems: chatListItems});
    // });
  }

  private getHistoryChatList(username: string): Observable<ChatListItem[]> {
    return this.conversationService.getUsersConversations(username).pipe(map(conversations => {
      return ChatListItemConverter.convertConversations(username, conversations);
    }));
    // this.conversationService.getUsersConversations(payload).subscribe(conversations => {
    //   const chatListItems = ChatListItemConverter.convertConversations(payload, conversations);
    //   setState({...getState(), loadedChatListItems: chatListItems});
    // });
  }
}
