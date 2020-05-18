import { PaginationService } from './pagination.service';
import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/data-models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PaginationQuery } from '../models/ui-models/pagination-query.model';

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

  findUsers(username: string): Observable<User[]> {
    return this.angularFirestore.collection<User>(firestoreCollectionsConstants.users, ref =>
    ref.orderBy('username').startAt(username).endAt(username + '\uf8ff')).valueChanges();
  }

  getLocalUsers(): Observable<User[]> {
    // TO DO replace with actual local users functions.
    const paginationQuery: PaginationQuery = {path: firestoreCollectionsConstants.users, field: 'username'};
    return this.paginationService.initLocalChatData(paginationQuery);
  }
}
