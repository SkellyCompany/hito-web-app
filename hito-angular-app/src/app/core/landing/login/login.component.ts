import { Login } from '../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/auth-user';
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

  login(authUser: AuthUser) {
    this.isSubmitted = true;
    this.store.dispatch(new Login(authUser));
  }
}
