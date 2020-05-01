import { User } from './../../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/shared/state-management/user.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  createUser(user: User) {
    this.store.dispatch(new CreateUser(user));
  }
}
