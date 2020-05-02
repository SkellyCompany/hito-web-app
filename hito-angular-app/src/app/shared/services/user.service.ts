import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: User) {
    return this.angularFirestore.collection('users').doc(user.uid).set({
      username: user.username
    }).catch((error) => {
    });
  }
}
