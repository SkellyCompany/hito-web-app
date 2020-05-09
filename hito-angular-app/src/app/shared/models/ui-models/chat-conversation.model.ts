import { Message } from '../data-models/message.model';

export interface ChatConversation {
  messages: Message[];
  name: string;
}
