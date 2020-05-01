import { Login } from './../../../shared/state-management/user.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  login(user: User) {
    this.isSubmitted = true;
    this.store.dispatch(new Login(user));
  }
}
