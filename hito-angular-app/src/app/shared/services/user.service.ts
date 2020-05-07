import { firebaseCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: User) {
    return this.angularFirestore.collection<User>(firebaseCollectionsConstants.users).doc(user.uid).set(user);
  }

  getUser(uid: string): Observable<User> {
    return this.angularFirestore.collection(firebaseCollectionsConstants.users).doc<User>(uid).valueChanges();
  }

  findUser(username: string): Observable<User[]> {
    return this.angularFirestore.collection<User>(firebaseCollectionsConstants.users, ref =>
    ref.orderBy('username').startAt(username).endAt(username + '\uf8ff')).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.angularFirestore.collection<User>(firebaseCollectionsConstants.users).valueChanges();
  }

  getUsersInHistory(): Observable<User[]> {
    return this.angularFirestore.collection<User>(firebaseCollectionsConstants.users).valueChanges();
    // return this.angularFirestore.collection<User>(firebaseCollectionsConstants.histories).doc<User>('l6BPbIz7efoe6eupWfcMKSlbF5Aw2')
    // .collection('historyUser').doc<User>('3iU9F8hazFFYmrhEYyFB')
    // .valueChanges();
  }
}
