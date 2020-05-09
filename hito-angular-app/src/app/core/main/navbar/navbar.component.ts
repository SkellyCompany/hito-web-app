import { User } from './../../../shared/models/user.model';
import { AuthState } from './../../../shared/state-management/auth.state';
import { Logout } from './../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { InitHistoryData, InitLocalUsersData } from 'src/app/shared/state-management/chat-list.action';
import { Observable } from 'rxjs';

enum NavbarAction {
  LOCAL_GROUPS = 0,
  LOCAL_USERS = 1,
  HISTORY = 2
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;

  readonly LOCAL_GROUPS_ACTION: NavbarAction = NavbarAction.LOCAL_GROUPS;
  readonly LOCAL_USERS_ACTION: NavbarAction = NavbarAction.LOCAL_USERS;
  readonly HISTORY_ACTION: NavbarAction = NavbarAction.HISTORY;

  loggedInUser: User;
  profilePopupShown = false;
  activeAction: NavbarAction;

  constructor(private store: Store) {
    this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });
  }

  ngOnInit(): void {
    this.onActionClick(NavbarAction.LOCAL_USERS);
  }

  toggleProfilePopup() {
    this.profilePopupShown = !this.profilePopupShown;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  onActionClick(action: NavbarAction) {
    this.activeAction = action;
    // if (action === this.GROUP_CHAT_ACTION) {
    //   this.store.dispatch(new InitLocalChatData());
    if (action === this.LOCAL_USERS_ACTION) {
      this.store.dispatch(new InitLocalUsersData());
    } else {
      this.store.dispatch(new InitHistoryData(this.loggedInUser.username));
    }
  }
}
