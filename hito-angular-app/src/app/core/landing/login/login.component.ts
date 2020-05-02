import { Login } from '../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/shared/state-management/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasSubmittedForm: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  }, { updateOn: 'submit' }
  );

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  login(authUser: AuthUser) {
    this.hasSubmittedForm = true;
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(authUser)).subscribe(user => {
        this.router.navigate(['/app']);
      });
    }
  }
}
