import { UserState } from './../../../shared/state-management/user.state';
import { FindUser } from './../../../shared/state-management/user.action';
import { Init, LoadNextPage } from './../../../shared/state-management/pagination.action';
import { PaginationQuery } from './../../../shared/models/pagination-query.model';
import { PaginationService } from './../../../shared/services/pagination.service';
import { Observable } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { firebaseCollectionsConstants } from 'src/app/shared/constants';
import { PaginationState } from 'src/app/shared/state-management/pagination.state';

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

  users: Observable<User[]>;
  selectedUser: User;
  searchForm = new FormGroup({
    username: new FormControl('')
  });
  constructor(private store: Store) {
    const paginationQuery: PaginationQuery = { path: firebaseCollectionsConstants.users, field: 'username', limit: 12 };
    this.store.dispatch(new Init(paginationQuery)).subscribe(() => {
      this.users = this.loadedUsers$;
    });
  }
  // USE NGXS INSTEAD OF DIRECT SERVICES
  ngOnInit(): void {

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
