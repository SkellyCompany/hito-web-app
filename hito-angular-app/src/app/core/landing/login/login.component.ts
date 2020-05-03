import { routingConstants, validationConstants } from './../../../shared/constants';
import { Login } from '../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInput } from 'src/app/shared/models/input-models/login-input.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasSubmittedForm: boolean;
  emailErrorMessage: string;
  passwordErrorMessage: string;

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

  login(loginInput: LoginInput) {
    this.hasSubmittedForm = true;
    this.validateForm();
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(loginInput)).subscribe(() => {
        console.log("AAAAAAAAAAAAAAAAA");
        //this.router.navigate(['/' + routingConstants.app]);
      });
    }
  }

  validateForm() {
    if (this.loginForm.get('email').hasError('required')) {
      this.emailErrorMessage = validationConstants.emailRequired;
    }
    if (this.loginForm.get('email').hasError('email')) {
      this.emailErrorMessage = validationConstants.emailEmail;
    }
    if (this.loginForm.get('password').hasError('required')) {
      this.passwordErrorMessage = validationConstants.passwordRequired;
    }
  }
}
