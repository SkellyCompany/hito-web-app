import { PaginationService } from './../../../shared/services/pagination.service';
import { Observable } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;
  selectedUser: User;
  searchForm = new FormGroup({
    username: new FormControl('')
  });
  constructor(private store: Store, private userService: UserService, public paginationService: PaginationService) {     this.paginationService.init('users', 'username');
  this.users = this.paginationService.data;}
  // USE NGXS INSTEAD OF DIRECT SERVICES
  ngOnInit(): void {

  }

  scrollHandler(e: string) {
    if (e === 'bottom') {
      this.paginationService.loadNextPage();
      this.users = this.paginationService.data;
    }
  }

  searchUser() {
    const username = this.searchForm.get('username').value;
    if (username !== '') {
      this.users = this.userService.findUser(username);
    } else {
      this.users = this.paginationService.data;
    }
  }

  onSelect(user: User) {
    this.selectedUser = user;
  }
}
