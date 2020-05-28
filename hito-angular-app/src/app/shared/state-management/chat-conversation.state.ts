import { Observable } from 'rxjs';
import { PrivateConversationFirestore } from './../models/firestore-models/private-conversation-firestore.model';
import { PrivateConversationDTO } from './../models/dtos/private-conversation-dto.model';
import { FirestoreConverter } from './../models/converters/firestore.converter';
import { PrivateConversation } from './../models/data-models/private-conversation.model';
import { UserService } from './../services/user.service';
import { PrivateConversationService } from './../services/private-conversation.service';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadPrivateConversation, LoadInterlocutor, SendMessage } from './chat-conversation.action';
import { Message } from '../models/data-models/message';
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

  @Action(SendMessage)
  SendMessage({getState}: StateContext<ChatConversationStateModel>, {messageDTO, loggedInUid}: SendMessage) {
    if (getState().loadedPrivateConversation === undefined) {
      const privateConversationDTO: PrivateConversationDTO = {
        firstInterlocutorId: loggedInUid,
        secondInterlocutorId: getState().loadedInterlocutor.uid
      };
      this.privateConversationService.createPrivateConversation(privateConversationDTO).then(privateConversationId => {
        this.privateConversationService.insertMessage(privateConversationId, messageDTO);
      });
    } else {
      const privateConversationId: string = getState().loadedPrivateConversation.id;
      this.privateConversationService.insertMessage(privateConversationId, messageDTO);
    }
  }

  @Action(LoadInterlocutor)
  LoadInterlocutor({getState, setState}: StateContext<ChatConversationStateModel>, {interlocutorId}: LoadInterlocutor) {
    this.userService.getUser(interlocutorId).subscribe(interlocutor => {
      setState({...getState(), loadedInterlocutor: interlocutor});
    });
  }

  @Action(LoadPrivateConversation)
  LoadPrivateConversation(ctx: StateContext<ChatConversationStateModel>,
                          {firstInterlocutorId, secondInterlocutorId}: LoadPrivateConversation) {
    this.privateConversationService.getPrivateConversation(firstInterlocutorId, secondInterlocutorId)
    .subscribe(privateConversationFirestore => {
      if (privateConversationFirestore === undefined) {
        this.privateConversationService.getPrivateConversation(secondInterlocutorId, firstInterlocutorId)
        .subscribe(privateConversationFirestore => {
          if (privateConversationFirestore === undefined) {
            ctx.setState({...ctx.getState(), loadedPrivateConversation: undefined});
          } else {
            this.fetchUsersAndMessages(privateConversationFirestore, ctx);
          }
        });
      } else {
        this.fetchUsersAndMessages(privateConversationFirestore, ctx);
      }
    });
  }

  private fetchUsersAndMessages(privateConversationFirestore: PrivateConversationFirestore, ctx: StateContext<ChatConversationStateModel>) {
    this.userService.getUser(privateConversationFirestore.firstInterlocutorId).subscribe(firstInterlocutor => {
      this.userService.getUser(privateConversationFirestore.secondInterlocutorId).subscribe(secondInterlocutor => {
        this.privateConversationService.getMessages(privateConversationFirestore.id).subscribe(firestoreMessages => {
          const privateMessages: Message[]
          = FirestoreConverter.convertFirestoreMessages(firestoreMessages, firstInterlocutor, secondInterlocutor);
          const privateConversation: PrivateConversation = {
            id: privateConversationFirestore.id,
            firstInterlocutor: firstInterlocutor,
            secondInterlocutor: secondInterlocutor,
            messages: privateMessages
          };
          ctx.setState({...ctx.getState(), loadedPrivateConversation: privateConversation});
        });
      });
    });
  }
}
