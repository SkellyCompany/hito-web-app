import { FirestoreConverter } from './../models/converters/firestore.converter';
import { PrivateConversation } from './../models/data-models/private-conversation.model';
import { UserService } from './../services/user.service';
import { PrivateConversationService } from './../services/private-conversation.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadPrivateConversation, LoadInterlocutor } from './chat-conversation.action';
import { PrivateMessage } from '../models/data-models/private-message.model';
import { User } from '../models/data-models/user.model';

export class ChatConversationStateModel {
  loadedInterlocutor: User;
  loadedPrivateConversation: PrivateConversation;
}

@State<ChatConversationStateModel>({
  name: 'chatConversation',
  defaults: {
    loadedInterlocutor: undefined,
    loadedPrivateConversation: undefined,
   }
})

@Injectable()
export class ChatConversationState {

  constructor(private privateConversationService: PrivateConversationService, private userService: UserService) {}

  @Selector()
  static loadedPrivateConversation(state: ChatConversationStateModel) {
    return state.loadedPrivateConversation;
  }

  @Selector()
  static loadedInterlocutor(state: ChatConversationStateModel) {
    return state.loadedInterlocutor;
  }

  // @Action(SendMessage)
  // SendMessage({getState, setState}: StateContext<ChatConversationStateModel>, {conversationId, message}: SendMessage) {
  //   this.conversationService.sendMessage(conversationId, message);
  // }

  @Action(LoadInterlocutor)
  LoadInterlocutor({getState, setState}: StateContext<ChatConversationStateModel>, {interlocutorId}: LoadInterlocutor) {
    this.userService.getUser(interlocutorId).subscribe(interlocutor => {
      setState({...getState(), loadedInterlocutor: interlocutor});
    });
  }

  @Action(LoadPrivateConversation)
  LoadPrivateConversation({getState, setState}: StateContext<ChatConversationStateModel>,
                          {firstInterlocutorId, secondInterlocutorId}: LoadPrivateConversation) {
    this.privateConversationService.getPrivateConversation(firstInterlocutorId, secondInterlocutorId)
    .subscribe(privateConversationFirestore => {
      if (privateConversationFirestore !== undefined) {
        this.userService.getUser(privateConversationFirestore.firstInterlocutorId).subscribe(firstInterlocutor => {
          this.userService.getUser(privateConversationFirestore.secondInterlocutorId).subscribe(secondInterlocutor => {
            this.privateConversationService.getMessages(privateConversationFirestore.id).subscribe(firestoreMessages => {
              const privateMessages: PrivateMessage[]
              = FirestoreConverter.convertFirestoreMessages(firestoreMessages, firstInterlocutor, secondInterlocutor);
              const privateConversation: PrivateConversation = {
                id: privateConversationFirestore.id,
                firstInterlocutor: firstInterlocutor,
                secondInterlocutor: secondInterlocutor,
                messages: privateMessages
              };
              setState({...getState(), loadedPrivateConversation: privateConversation});
            });
          });
        });
      } else {
        setState({...getState(), loadedPrivateConversation: undefined});
      }
    });
  }
}
