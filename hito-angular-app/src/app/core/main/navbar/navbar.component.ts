import { InitLocalChatData, InitHistoryData } from './../../../shared/state-management/pagination.action';
import { Logout } from './../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationQuery } from 'src/app/shared/models/pagination-query.model';
import { firebaseCollectionsConstants } from 'src/app/shared/constants';

enum NavbarAction {
  GROUP_CHAT = 0,
  LOCAL_CHAT = 1,
  HISTORY = 2
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly GROUP_CHAT_ACTION: NavbarAction = NavbarAction.GROUP_CHAT;
  readonly LOCAL_CHAT_ACTION: NavbarAction = NavbarAction.LOCAL_CHAT;
  readonly HISTORY_ACTION: NavbarAction = NavbarAction.HISTORY;

  profilePopupShown = false;
  activeAction: NavbarAction;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.onActionClick(NavbarAction.LOCAL_CHAT);
  }

  toggleProfilePopup() {
    this.profilePopupShown = !this.profilePopupShown;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  onActionClick(action: NavbarAction) {
    this.activeAction = action;
    const paginationQuery: PaginationQuery = { path: firebaseCollectionsConstants.users, field: 'username', limit: 12 };
    if (action === this.GROUP_CHAT_ACTION) {
      this.store.dispatch(new InitLocalChatData(paginationQuery));
    } else if (action === this.LOCAL_CHAT_ACTION) {
      this.store.dispatch(new InitLocalChatData(paginationQuery));
    } else {
      this.store.dispatch(new InitHistoryData(paginationQuery));
    }
  }
}
