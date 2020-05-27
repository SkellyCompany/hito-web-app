import { PrivateMessage } from './../data-models/private-message.model';
import { User } from './../data-models/user.model';
import { MessageFirestore } from './../firestore-models/message-firestore.model';

export class FirestoreConverter {
  static convertFirestoreMessages(firestoreMessages: MessageFirestore[], firstInterlocutor: User, secondInterlocutor: User):
   PrivateMessage[] {
    const messages: PrivateMessage[] = [];
    for (const firestoreMessage of firestoreMessages) {
      let interlocutor: User;

      if (firestoreMessage.interlocutorId === firstInterlocutor.uid) {
        interlocutor = firstInterlocutor;
      } else {
        interlocutor = secondInterlocutor;
      }
      const postTime: Date = firestoreMessage.postTime;
      const text: string = firestoreMessage.text;

      const message: PrivateMessage = {
        sender: interlocutor,
        postTime: postTime,
        text: text
      };
      messages.push(message);
    }
    return messages;
  }
}
