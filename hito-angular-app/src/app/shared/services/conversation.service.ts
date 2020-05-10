import { Conversation } from '../models/data-models/conversation.model';
import { Observable } from 'rxjs';
import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../models/data-models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUsersConversations(username: string): Observable<Conversation[]> {
    return this.angularFirestore.collection<Conversation>(firestoreCollectionsConstants.conversations,
      ref => ref.where('users', 'array-contains', username)).valueChanges();
  }

  getConversation(id: string): Observable<Conversation> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.conversations)
    .doc<Conversation>(id).valueChanges();
  }

  getMessages(conversationId: string): Observable<Message[]> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.conversations)
    .doc(conversationId).collection<Message>(firestoreCollectionsConstants.conversationMessages,
      ref => ref.orderBy('postTime', 'asc')).valueChanges();
  }

  sendMessage(conversationId: string, message: Message) {
    this.angularFirestore.collection(firestoreCollectionsConstants.conversations)
    .doc(conversationId).collection<Message>(firestoreCollectionsConstants.conversationMessages)
    .add(message);
  }
}
