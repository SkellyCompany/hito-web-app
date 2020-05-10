import { CreateAccountInput } from '../models/ui-models/input-models/create-account-input.model';
import { ResetPasswordInput } from '../models/ui-models/input-models/reset-password-input.model';
import { LoginInput } from '../models/ui-models/input-models/login-input.model';

export class CreateUser {
  static readonly type = '[AuthUser] Create User';

  constructor(public payload: CreateAccountInput) {}
}

export class Login {
  static readonly type = '[AuthUser] Login';

  constructor(public payload: LoginInput) {}
}

export class Logout {
  static readonly type = '[AuthUser] Logout';

  constructor() {}
}

export class ResetPassword {
  static readonly type = '[AuthUser] Reset Password';

  constructor(public payload: ResetPasswordInput) {}
}
