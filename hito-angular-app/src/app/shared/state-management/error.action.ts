import { ErrorMessage } from './../models/error-message';

export class ErrorOccurred {
  static readonly type = '[ErrorMessage] Error Occurred';

  constructor(public error: ErrorMessage) {}
}
