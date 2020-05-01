import { AuthUser } from '../models/auth-user';

export class CreateUser {
  static readonly type = '[AuthUser] Create User';

  constructor(public payload: AuthUser) {}
}

export class Login {
  static readonly type = '[AuthUser] Login';

  constructor(public payload: AuthUser) {}
}

export class ResetPassword {
  static readonly type = '[AuthUser] Reset Password';

  constructor(public payload: AuthUser) {}
}
