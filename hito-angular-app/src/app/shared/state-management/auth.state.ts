import { UserService } from './../services/user.service';
import { ErrorOccurred } from './error.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login, ResetPassword, Logout, CreateAccountAndLogin } from './auth.action';
import { User } from '../models/data-models/user.model';
import { Router } from '@angular/router';
import { routingConstants } from '../constants';

export interface AuthStateModel {
    loggedInUser: User;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      loggedInUser: undefined
    }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(CreateAccountAndLogin)
  createAccountAndLogin({getState, setState, dispatch}: StateContext<AuthStateModel>, {createAccountDTO}: CreateAccountAndLogin) {
    this.userService.isUsernameAvailable(createAccountDTO.username).subscribe(available => {
      if (available) {
        return this.authService.createUser(createAccountDTO).then(userCredential => {
          const user: User = {
            uid: userCredential.user.uid,
            username: createAccountDTO.username,
            email: userCredential.user.email
          };
          return this.userService.createUser(user).then(() => {
            this.userService.getUser(user.uid).subscribe(userResult => {
              setState({...getState(), loggedInUser: userResult});
              this.router.navigate(['/' + routingConstants.app]);
            });
          }).catch(error => {
            dispatch(new ErrorOccurred(error));
          });
        });
      }
    });
  }

  @Action(Login)
  login({getState, setState, dispatch }: StateContext<AuthStateModel>, {loginDTO}: Login) {
    return this.authService.login(loginDTO).then(userCredential => {
      this.userService.getUser(userCredential.user.uid).subscribe(userResult => {
        setState({...getState(), loggedInUser: userResult});
        this.router.navigate(['/' + routingConstants.app]);
      });
    }).catch(error => {
      dispatch(new ErrorOccurred(error));
    });
  }

  @Action(Logout)
  logout({getState, setState, dispatch }: StateContext<AuthStateModel>) {
    return this.authService.logout().then(() => {
      setState({...getState(), loggedInUser: undefined});
      this.router.navigate(['/' + routingConstants.login]);
    })
    .catch(error => {
      dispatch(new ErrorOccurred(error));
    });
  }

  @Action(ResetPassword)
  resetPassword({dispatch}: StateContext<AuthStateModel>, {resetPasswordDTO}: ResetPassword) {
    this.authService.resetPassword(resetPasswordDTO).catch(error => {
      dispatch(new ErrorOccurred(error));
      throw new Error(error);
    });
  }
}
