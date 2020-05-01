import { UserService } from './user.service';
import { AuthUser } from '../models/auth-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService) { }

  createUser(user: AuthUser) {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email , user.password).then(result => {
        this.userService.createUser("REPLACE", result);
      });
  }

  login(user: AuthUser) {
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
    .catch(error => {
      const errorMessage = this.getLoginErrorMessage(error.code);
      alert(errorMessage);
    });
  }

  resetPassword(user: AuthUser) {
    this.angularFireAuth.sendPasswordResetEmail(user.email)
    .catch(error => {
      const errorMessage = this.getResetPasswordErrorMessage(error.code);
      alert(errorMessage);
    });
  }

  getCreateAccountErrorMessage(error: any) {
    switch (error) {
      case 'auth/invalid-email' : {
        return 'Email is invalid.';
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid.';
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
      case 'auth/invalid-email' : {
        return 'Email is invalid or does not exist.';
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid.';
      }
      case 'auth/user-not-found' : {
        return 'User was not found.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }

  getResetPasswordErrorMessage(error: any) {
    switch (error) {
      case 'auth/invalid-email' : {
        return 'Email is invalid or does not exist.';
      }
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
