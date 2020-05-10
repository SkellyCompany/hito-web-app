import { Message } from '../data-models/message.model';

export interface ChatConversation {
  id: string;
  messages: Message[];
  name: string;
}
