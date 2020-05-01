import { User } from '../models/user';

export class CreateUser {
  static readonly type = '[User] Create';

  constructor(public payload: User) {}
}

export class Login {
  static readonly type = '[User] Login';

  constructor(public payload: User) {}
}

export class ResetPassword {
  static readonly type = '[User] Reset Password';

  constructor(public payload: User) {}
}
