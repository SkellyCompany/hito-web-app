import { CreateAccountInput } from '../../../shared/models/input-models/create-account-input.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/shared/state-management/auth.action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { routingConstants, validationConstants } from 'src/app/shared/constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  hasSubmittedForm: boolean;
  emailErrorMessage: string;
  usernameErrorMessage: string;
  passwordErrorMessage: string;

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
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-6])[A-Za-z\d$@$!%*?&].{8,}')
    ])
  }, { updateOn: 'submit' }
  );

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(createAccountInput: CreateAccountInput) {
    this.hasSubmittedForm = true;
    this.validateForm();
    if (this.createAccountForm.valid) {
      this.store.dispatch(new CreateUser(createAccountInput)).subscribe(user => {
        // Refactor add route change here
      });
    }
  }

  validateForm() {
    if (this.createAccountForm.get('email').hasError('required')) {
      this.emailErrorMessage = validationConstants.emailRequired;
    }
    if (this.createAccountForm.get('email').hasError('email')) {
      this.emailErrorMessage = validationConstants.emailEmail;
    }
    if (this.createAccountForm.get('username').hasError('required')) {
      this.usernameErrorMessage = validationConstants.usernameRequired;
    }
    if (this.createAccountForm.get('password').hasError('required')) {
      this.passwordErrorMessage = validationConstants.passwordRequired;
    }
    if (this.createAccountForm.get('password').hasError('pattern')) {
      this.passwordErrorMessage = validationConstants.passwordWeak;
    }
  }
}
