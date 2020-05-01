import { AuthUser } from '../../../shared/models/auth-user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/shared/state-management/auth.action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  hasSubmittedForm: boolean;

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

  createUser(authUser: AuthUser) {
    this.hasSubmittedForm = true;
    if (this.createAccountForm.valid) {
      this.store.dispatch(new CreateUser(authUser)).subscribe(user => {
        this.router.navigate(['/app']);
      });
    }
  }
}
