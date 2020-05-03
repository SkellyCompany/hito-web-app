import { ErrorOccurred } from './error.action';
import { ErrorMessage } from '../models/error-message.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class ErrorStateModel {
  errors: ErrorMessage[];
}

@State<ErrorStateModel>({
  name: 'error',
  defaults: {
    errors: []
  }
})

@Injectable()
export class ErrorState {

  constructor() {}

  @Selector()
  static errors(state: ErrorStateModel) {
    return state.errors;
  }

  @Action(ErrorOccurred)
  errorOccurred({getState, patchState, dispatch}: StateContext<ErrorStateModel>, action: ErrorOccurred) {
    let errors = getState().errors;
    action.error.message = '';
    errors = [...errors];
    errors.push(action.error);
    patchState({
      errors
    });
  }
}
