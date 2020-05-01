import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: string, result: any) {
    this.angularFirestore.collection('users').doc(result.user.uid).set({
      username: user
    });
  }
}
