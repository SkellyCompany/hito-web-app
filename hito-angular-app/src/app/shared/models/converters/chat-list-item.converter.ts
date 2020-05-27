import { ChatListItem } from '../ui-models/chat-list-item.model';
import { User } from '../data-models/user.model';
export class ChatListItemConverter {

  static convertUsers(users: User[]): ChatListItem[] {
    const chatListItems: ChatListItem[] = [];
    for (const user of users) {
      chatListItems.push({
        displayName: user.username,
        conversationId: undefined
      });
    }
    return chatListItems;
  }

}
