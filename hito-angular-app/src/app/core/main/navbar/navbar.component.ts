import { SetChatListMode } from './../../../shared/state-management/chat-list.action';
import { User } from '../../../shared/models/data-models/user.model';
import { AuthState } from './../../../shared/state-management/auth.state';
import { Logout } from './../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChatListMode } from 'src/app/shared/global-enums/chat-list-mode.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly LOCAL_GROUPS_MODE: ChatListMode = ChatListMode.LOCAL_GROUPS;
  readonly LOCAL_USERS_MODE: ChatListMode = ChatListMode.LOCAL_USERS;
  readonly HISTORY_MODE: ChatListMode = ChatListMode.HISTORY;

  loggedInUser: User;
  profilePopupShown = false;
  activeMode: ChatListMode;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.onActionClick(ChatListMode.LOCAL_USERS);
  }

  toggleProfilePopup() {
    this.profilePopupShown = !this.profilePopupShown;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  onActionClick(action: ChatListMode) {
    if (action !== this.activeMode) {
      this.activeMode = action;
      this.store.dispatch(new SetChatListMode(action));
    }
  }
}
