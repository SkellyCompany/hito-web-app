import { Conversation } from './../models/conversation.model';
import { Observable } from 'rxjs';
import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUsersConversations(username: string): Observable<Conversation[]> {
    return this.angularFirestore.collection<Conversation>(firestoreCollectionsConstants.conversations,
    ref => ref.where('users', 'array-contains', username)).valueChanges();
  }

  getConversationMessages() {

  }
}
