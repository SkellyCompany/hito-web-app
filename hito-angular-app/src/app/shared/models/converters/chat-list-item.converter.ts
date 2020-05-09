import { Conversation } from './../conversation.model';
import { ChatListItem } from '../chat-list-item.model';
export class ChatListItemConverter {

  static convertConversations(username: string, conversations: Conversation[]): ChatListItem[] {
    const chatListItems: ChatListItem[] = [];
    for (const conversation of conversations) {
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
      chatListItems.push( {
        name: conversationName,
        conversationId: conversation.id
      });
    }
    return chatListItems;
  }
}
