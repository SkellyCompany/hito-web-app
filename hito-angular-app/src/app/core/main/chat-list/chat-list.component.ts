import { LoadChatConversation } from './../../../shared/state-management/chat-conversation.action';
import { ChatListState } from '../../../shared/state-management/chat-list.state';
import { LoadNextPage } from '../../../shared/state-management/chat-list.action';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ChatListItem } from 'src/app/shared/models/ui-models/chat-list-item.model';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { User } from 'src/app/shared/models/data-models/user.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;

  @Select(ChatListState.loadedChatListItems)
  loadedChatListItems$: Observable<ChatListItem[]>;

  loggedInUser: User;
  chatListItems: ChatListItem[];
  filteredChatListItems: ChatListItem[];
  selectedChatListItem: ChatListItem;

  searchForm = new FormGroup({
    filter: new FormControl('')
  });

  constructor(private store: Store) {
    this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });
    this.loadedChatListItems$.subscribe(loadedChatListItems => {
      this.chatListItems = loadedChatListItems;
      const searchInput = this.searchForm.get('filter').value;
      this.filteredChatListItems = this.filterChatListItems(this.chatListItems, searchInput);
    });
  }

  ngOnInit(): void {
  }

  scrollHandler(e: string) {
    if (e === 'bottom') {
      this.store.dispatch(new LoadNextPage()).subscribe(loadedChatListItems => {
        this.chatListItems = loadedChatListItems;
      });
    }
  }

  searchChatListItems() {
    const searchInput = this.searchForm.get('filter').value;
    this.filteredChatListItems = this.filterChatListItems(this.chatListItems, searchInput);
  }

  private filterChatListItems(chatList: ChatListItem[], filter: string): ChatListItem[] {
    const filteredChatList: ChatListItem[] = [];
    if (filter === undefined || filter.length === 0) {
      return chatList;
    }
    for (const chatItem of chatList) {
      const displayName: string = chatItem.displayName;
      if (displayName.length >= filter.length) {
        if (displayName.substring(0, filter.length).toLowerCase() === filter.toLowerCase()) {
          filteredChatList.push(chatItem);
        }
      }
    }
    return filteredChatList;
  }

  onSelect(chatListItem: ChatListItem) {
    this.selectedChatListItem = chatListItem;
    this.store.dispatch(new LoadChatConversation(this.loggedInUser.username, chatListItem.conversationId));
  }
}
