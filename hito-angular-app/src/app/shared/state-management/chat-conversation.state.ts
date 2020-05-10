import { ChatConversationConverter } from './../models/converters/chat-conversation.converter';
import { ChatConversation } from './../models/ui-models/chat-conversation.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { LoadChatConversation, SendMessage } from './chat-conversation.action';

export class ChatConversationStateModel {
  loadedChatConversation: ChatConversation;
}

@State<ChatConversationStateModel>({
  name: 'chatConversation',
  defaults: {
    loadedChatConversation: undefined,
   }
})

@Injectable()
export class ChatConversationState {

  constructor(private conversationService: ConversationService) {}

  @Selector()
  static loadedChatConversation(state: ChatConversationStateModel) {
    return state.loadedChatConversation;
  }

  @Action(LoadChatConversation)
  LoadChatConversation({getState, setState}: StateContext<ChatConversationStateModel>, {username, payload}: LoadChatConversation) {
    if (!payload || payload.length === 0) {
      //TO DO - CREATE CONVERSATION AND UPDATE LOADEDCHATCONVERSATION
    } else {
      this.conversationService.getConversation(payload).subscribe(conversation => {
        this.conversationService.getMessages(payload).subscribe(messages => {
          const chatConversation = ChatConversationConverter.convertConversationWithMessages(username, conversation, messages);
          setState({...getState(), loadedChatConversation: chatConversation});
        });
      });
    }
  }

  @Action(SendMessage)
  SendMessage({getState, setState}: StateContext<ChatConversationStateModel>, {conversationId, payload}: SendMessage) {
    this.conversationService.sendMessage(conversationId, payload);
  }
}
