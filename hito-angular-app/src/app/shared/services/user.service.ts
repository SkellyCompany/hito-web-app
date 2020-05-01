import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) { }

  createUser(user: User): Observable<User> {
    return from(
      this.angularFireAuth.createUserWithEmailAndPassword(user.email , user.password).then(x => {
        this.angularFirestore.collection('users').add(user);
      })
    ).pipe(
      map(() => {
        return user;
      })
    );
  }

  login(user: User) {
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
    .catch(error => {
      const errorMessage = this.getLoginErrorMessage(error.code);
      alert(errorMessage);
    });
  }

  resetPassword(user: User) {
    this.angularFireAuth.sendPasswordResetEmail(user.email)
    .catch(error => {
      const errorMessage = this.getResetPasswordErrorMessage(error.code);
      alert(errorMessage);
    });
  }

  getCreateAccountErrorMessage(error: any) {
    switch (error) {
      case 'auth/invalid-email' : {
        return 'Email is invalid or does not exist.';
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid or does not exist.';
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
        return 'Password is invalid or does not exist.';
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
