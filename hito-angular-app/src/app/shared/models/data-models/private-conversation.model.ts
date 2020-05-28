import { Message } from './message';
import { User } from './user.model';

export interface PrivateConversation {
  id: string;
  firstInterlocutor: User;
  secondInterlocutor: User;
  messages: Message[];
}
