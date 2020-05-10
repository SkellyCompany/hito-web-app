import { Message } from 'src/app/shared/models/data-models/message.model';

export class LoadChatConversation {
  static readonly type = '[ChatConversation] Load chat conversation';

  constructor(public username: string, public payload: string) {}
}

export class SendMessage {
  static readonly type = '[ChatConversation] Send message';

  constructor(public conversationId: string, public payload: Message) {}
}
