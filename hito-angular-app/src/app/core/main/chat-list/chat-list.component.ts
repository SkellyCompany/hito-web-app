import { LoadChatConversation } from './../../../shared/state-management/chat-conversation.action';
import { ChatListState } from '../../../shared/state-management/chat-list.state';
import { FindChatListItems, LoadNextPage } from '../../../shared/state-management/chat-list.action';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ChatListItem } from 'src/app/shared/models/ui-models/chat-list-item.model';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { User } from 'src/app/shared/models/data-models/user.model';
import { ChatListMode } from 'src/app/shared/global-enums/chat-list-mode.enum';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;

  @Select(ChatListState.searchedChatListItems)
  searchedChatListItems$: Observable<ChatListItem[]>;
  @Select(ChatListState.loadedChatListItems)
  loadedChatListItems$: Observable<ChatListItem[]>;
  @Select(ChatListState.chatListMode)
  chatListMode$: Observable<ChatListMode>;

  loggedInUser: User;
  chatListMode: ChatListMode;
  chatListItems: Observable<ChatListItem[]>;
  selectedChatListItem: ChatListItem;

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private store: Store) {
    this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });
    this.chatListMode$.subscribe(chatListMode => {
      this.chatListMode = chatListMode;
    });
    this.chatListItems = this.loadedChatListItems$;
  }

  ngOnInit(): void {
  }

  scrollHandler(e: string) {
    if (e === 'bottom') {
      this.store.dispatch(new LoadNextPage()).subscribe(() => {
        this.chatListItems = this.loadedChatListItems$;
      });
    }
  }

  searchChatListItems() {
    const name = this.searchForm.get('name').value;
    if (name !== '') {
      this.store.dispatch(new FindChatListItems(this.loggedInUser.username, name)).subscribe(() => {
        this.chatListItems = this.searchedChatListItems$;
      });
    } else {
      this.chatListItems = this.loadedChatListItems$;
    }
  }

  onSelect(chatListItem: ChatListItem) {
    this.selectedChatListItem = chatListItem;
    this.store.dispatch(new LoadChatConversation(this.loggedInUser.username, chatListItem.conversationId));
  }
}
