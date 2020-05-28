import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/data-models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  firstUserUid: string;
  lastUserUid: string;
  localUsers: User[] = [];
  done: boolean;

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: User) {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users).doc(user.uid).set(user);
  }

  getUser(uid: string): Observable<User> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.users).doc<User>(uid).valueChanges();
  }

  getLocalUsers(loggedInUid: string): Observable<User[]> {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users, ref => ref.limit(12))
    .valueChanges().pipe(map(users => {
      this.firstUserUid = users[0].uid;
      for (const user of users) {
        if (user.uid !== loggedInUid) {
          this.localUsers.push(user);
          if (user === users[users.length - 1]) {
            this.lastUserUid = user.uid;
          }
        }
      }
      return this.localUsers;
    }));
  }

  getMoreLocalUsers(loggedInUid: string): Observable<User[]> {
    if (!this.done) {
      return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users, ref => ref.limit(5).orderBy('uid')
      .startAfter(this.lastUserUid))
      .valueChanges().pipe(map(users => {
        for (const user of users) {
          if (user.uid === this.firstUserUid) {
            this.done = true;
            return;
          }
          if (user.uid !== loggedInUid) {
            this.localUsers.push(user);
            if (user === users[users.length - 1]) {
              this.lastUserUid = user.uid;
            }
          }
        }
        return this.localUsers;
      }));
    }

  }

  isUsernameAvailable(username: string): Observable<boolean> {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users, ref =>
    ref.orderBy('username').startAt(username).endAt(username)).valueChanges().pipe(first(), map(doc => {
      if (doc.length === 0) {
        return true;
      }
      return false;
    }));
  }
}
