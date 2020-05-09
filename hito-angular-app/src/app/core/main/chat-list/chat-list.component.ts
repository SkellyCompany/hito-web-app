import { ChatListState } from '../../../shared/state-management/chat-list.state';
import { FindChatListItems } from '../../../shared/state-management/chat-list.action';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ChatListItem } from 'src/app/shared/models/chat-list-item.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Select(ChatListState.searchedChatListItems)
  searchedChatListItems$: Observable<ChatListItem[]>;
  @Select(ChatListState.loadedChatListItems)
  loadedChatListItems$: Observable<ChatListItem[]>;

  chatListItems: Observable<ChatListItem[]>;
  selectedChatListItem: ChatListItem;

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private store: Store) {
    this.chatListItems = this.loadedChatListItems$;
  }

  ngOnInit(): void {
  }

  scrollHandler(e: string) {
    if (e === 'bottom') {
      // this.store.dispatch(new LoadNextPage()).subscribe(() => {
      //   this.chatListItems = this.loadedChatListItems$;
      // });
    }
  }

  searchChatListItems() {
    const name = this.searchForm.get('name').value;
    if (name !== '') {
      this.store.dispatch(new FindChatListItems(name)).subscribe(() => {
        this.chatListItems = this.searchedChatListItems$;
      });
    } else {
      this.chatListItems = this.loadedChatListItems$;
    }
  }

  onSelect(chatListItem: ChatListItem) {
    this.selectedChatListItem = chatListItem;
    ///
  }
}
