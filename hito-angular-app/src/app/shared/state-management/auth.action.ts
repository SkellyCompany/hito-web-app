import { CreateAccountDTO } from '../models/dtos/create-account-dto.model';
import { ResetPasswordDTO } from '../models/dtos/reset-password-dto.model';
import { LoginDTO } from '../models/dtos/login-dto.model';

export class CreateAccountAndLogin {
  static readonly type = '[AuthUser] Create Account And Login';

  constructor(public createAccountDTO: CreateAccountDTO) {}
}

export class Login {
  static readonly type = '[AuthUser] Login';

  constructor(public loginDTO: LoginDTO) {}
}

export class Logout {
  static readonly type = '[AuthUser] Logout';

  constructor() {}
}

export class ResetPassword {
  static readonly type = '[AuthUser] Reset Password';

  constructor(public resetPasswordDTO: ResetPasswordDTO) {}
}
