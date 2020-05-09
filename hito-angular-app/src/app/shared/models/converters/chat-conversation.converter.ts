import { ChatConversation } from './../ui-models/chat-conversation.model';
import { Conversation } from './../data-models/conversation.model';
import { Message } from '../data-models/message.model';
export class ChatConversationConverter {

  static convertConversationWithMessages(username: string, conversation: Conversation, messages: Message[]): ChatConversation {
    let conversationName;
    if (!conversation.isPrivate) {
      conversationName = conversation.name;
    } else {
      if (conversation.users[0] === username) {
        conversationName = conversation.users[1];
      } else {
        conversationName = conversation.users[0];
      }
    }
    const chatConversation: ChatConversation = {
      name: conversationName,
      messages: messages
    };
    return chatConversation;
  }

}
