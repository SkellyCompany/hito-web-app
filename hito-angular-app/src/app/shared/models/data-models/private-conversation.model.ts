import { PrivateMessage } from './private-message.model';
import { User } from './user.model';

export interface PrivateConversation {
  id: string;
  firstInterlocutor: User;
  secondInterlocutor: User;
  messages: PrivateMessage[]
}
