import { Conversation } from '../data-models/conversation.model';
import { ChatListItem } from '../ui-models/chat-list-item.model';
import { User } from '../data-models/user.model';
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

  static convertUsers(username: string, users: User[]): ChatListItem[] {
    const chatListItems: ChatListItem[] = [];
    for (const user of users) {
      if(user.username !== username) {
        chatListItems.push({
          name: user.username,
          conversationId: undefined
        });
      }
    }
    return chatListItems;
  }

}
