import { PaginationService } from './pagination.service';
import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/data-models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PaginationQuery } from '../models/ui-models/pagination-query.model';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore, private paginationService: PaginationService) { }

  createUser(user: User) {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users).doc(user.uid).set(user);
  }

  getUser(uid: string): Observable<User> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.users).doc<User>(uid).valueChanges();
  }

  getLocalUsers(loggedInUid: string): Observable<User[]> {
    // const paginationQuery: PaginationQuery = {path: firestoreCollectionsConstants.users, field: 'username'};
    // return this.paginationService.initLocalChatData(paginationQuery).pipe(map(users => {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users).valueChanges().pipe(map(users => {
      const localUsers: User[] = [];
      for (const user of users) {
        if (user.uid !== loggedInUid) {
          localUsers.push(user);
        }
      }
      return localUsers;
    }));
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
