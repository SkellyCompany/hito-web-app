import { Conversation } from '../models/data-models/conversation.model';
import { Observable } from 'rxjs';
import { firestoreCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../models/data-models/message.model';
import { map } from 'rxjs/operators';

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
    .doc(conversationId).collection<any>(firestoreCollectionsConstants.conversationMessages,
      ref => ref.orderBy('postTime', 'asc')).valueChanges()
      .pipe(map(firebaseMessages => {
        const messages: Message[] = [];
        firebaseMessages.forEach(firebaseMessage => {
          messages.push({
            id: firebaseMessage.id,
            username: firebaseMessage.username,
            text: firebaseMessage.text,
            postTime: firebaseMessage.postTime.toDate()
          });
        });
        return messages;
      }));
  }

  sendMessage(conversationId: string, message: Message) {
    this.angularFirestore.collection(firestoreCollectionsConstants.conversations)
    .doc(conversationId).collection<Message>(firestoreCollectionsConstants.conversationMessages)
    .add(message);
  }

  findConversations(user: string): Observable<Conversation[]> {
    // TO DO Improve to check if users array starts with the user rather than if it contains the whole user string
    return this.angularFirestore.collection<Conversation>(firestoreCollectionsConstants.conversations, ref =>
    ref.orderBy('users', 'desc').where('users', 'array-contains', user)).valueChanges();
  }
}
