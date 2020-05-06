import { UserService } from './../../../shared/services/user.service';
import { UserState } from './../../../shared/state-management/user.state';
import { FindUser } from './../../../shared/state-management/user.action';
import { LoadNextPage, InitLocalChatData, InitHistoryData } from './../../../shared/state-management/pagination.action';
import { PaginationQuery } from './../../../shared/models/pagination-query.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { firebaseCollectionsConstants } from 'src/app/shared/constants';
import { PaginationState } from 'src/app/shared/state-management/pagination.state';

enum NavbarAction {
  GROUP_CHAT = 0,
  LOCAL_CHAT = 1,
  HISTORY = 2
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Select(UserState.searchedUsers)
  searchedUsers$: Observable<User[]>;
  @Select(PaginationState.loadedUsers)
  loadedUsers$: Observable<User[]>;

  readonly GROUP_CHAT_ACTION: NavbarAction = NavbarAction.GROUP_CHAT;
  readonly LOCAL_CHAT_ACTION: NavbarAction = NavbarAction.LOCAL_CHAT;
  readonly HISTORY_ACTION: NavbarAction = NavbarAction.HISTORY;

  users: Observable<User[]>;
  selectedUser: User;
  searchForm = new FormGroup({
    username: new FormControl('')
  });

  constructor(private store: Store, private userService: UserService) {
    const paginationQuery: PaginationQuery = { path: firebaseCollectionsConstants.users, field: 'username', limit: 12 };
    this.users = this.loadedUsers$;
  }

  ngOnInit(): void {
    const t = this.userService.getUsersInHistory();
    console.log(t[0]);
  }

  scrollHandler(e: string) {
    if (e === 'bottom') {
      this.store.dispatch(new LoadNextPage());
      this.users = this.loadedUsers$;
    }
  }

  searchUser() {
    const username = this.searchForm.get('username').value;
    if (username !== '') {
      this.store.dispatch(new FindUser(username)).subscribe(() => {
        this.users = this.searchedUsers$;
      });
    } else {
      this.users = this.loadedUsers$;
    }
  }

  onSelect(user: User) {
    this.selectedUser = user;
  }
}
