import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/data-models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: User) {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users).doc(user.uid).set(user);
  }

  getUser(uid: string): Observable<User> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.users).doc<User>(uid).valueChanges();
  }

  findUser(username: string): Observable<User[]> {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users, ref =>
    ref.orderBy('username').startAt(username).endAt(username + '\uf8ff')).valueChanges();
  }

  getLocalUsers(): Observable<User[]> {
    // TO DO replace random with actual local users functions.
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users).valueChanges();
  }
}
