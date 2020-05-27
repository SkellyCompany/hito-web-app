import { PrivateConversationDTO } from './../models/dtos/private-conversation-dto.model';
import { MessageDTO } from './../models/dtos/message-dto.model';
import { MessageFirestore } from './../models/firestore-models/message-firestore.model';
import { PrivateConversationFirestore } from '../models/firestore-models/private-conversation-firestore.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestoreCollectionsConstants } from '../constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateConversationService {

  constructor(private angularFirestore: AngularFirestore) { }

  getPrivateConversation(firstInterlocutorId: string, secondInterlocutorId: string): Observable<PrivateConversationFirestore> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.privateConversations, ref =>
      ref.where('secondInterlocutorId', '==', firstInterlocutorId)
      .where('firstInterlocutorId', '==', secondInterlocutorId)).snapshotChanges().pipe(map(docs => {
        if (docs.length > 0) {
          const doc = docs[0];
          const privateConversation: PrivateConversationFirestore = doc.payload.doc.data() as PrivateConversationFirestore;
          privateConversation.id = doc.payload.doc.id;
          return privateConversation;
        }
        return undefined;
      }));
  }

  getMessages(privateConversationId: string): Observable<MessageFirestore[]> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.privateConversations).doc(privateConversationId)
    .collection<any>(firestoreCollectionsConstants.messages, ref => ref.orderBy('postTime')).valueChanges().pipe(map(docs => {
      const firestoreMessages: MessageFirestore[] = [];
      docs.forEach(doc => {
        firestoreMessages.push({
          interlocutorId: doc.interlocutorId,
          text: doc.text,
          postTime: doc.postTime.toDate()
        });
      });
      return firestoreMessages;
    }));
  }

  insertMessage(privateConversationId: string, messageDTO: MessageDTO) {
    this.angularFirestore.collection(firestoreCollectionsConstants.privateConversations).doc(privateConversationId)
    .collection(firestoreCollectionsConstants.messages).add(messageDTO);
  }

  createPrivateConversation(privateConversationDTO: PrivateConversationDTO): Promise<string> {
    return this.angularFirestore.collection(firestoreCollectionsConstants.privateConversations).add(privateConversationDTO).then(doc => {
      return doc.id;
    });
  }
}
