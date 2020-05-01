import { User } from 'src/app/shared/models/user';
import { UserService } from './user.service';
import { AuthUser } from '../models/auth-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService) { }

  createUser(authUser: AuthUser) {
      this.angularFireAuth.createUserWithEmailAndPassword(authUser.email , authUser.password).then(result => {
        const user: User = {
          uid: result.user.uid,
          username: authUser.username
        };
        this.userService.createUser(user);
      }).catch(error => {
        const errorMessage = this.getCreateAccountErrorMessage(error.code);
        throw new Error(errorMessage);
      });
  }

  login(user: AuthUser) {
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
    .catch(error => {
      const errorMessage = this.getLoginErrorMessage(error.code);
      throw new Error(errorMessage);
    });
  }

  resetPassword(user: AuthUser) {
    this.angularFireAuth.sendPasswordResetEmail(user.email)
    .catch(error => {
      const errorMessage = this.getResetPasswordErrorMessage(error.code);
      throw new Error(errorMessage);
    });
  }

  getCreateAccountErrorMessage(error: any) {
    switch (error) {
      case 'auth/invalid-email' : {
        return 'Email is invalid.';
      }
      case 'auth/weak-password' : {
        return 'Password is too weak.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }

  getLoginErrorMessage(error: any) {
    switch (error) {
      case 'auth/user-not-found' : {
        return 'User was not found.';
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }

  getResetPasswordErrorMessage(error: any) {
    switch (error) {
      case 'auth/user-not-found' : {
        return 'Email was not found.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }
}
