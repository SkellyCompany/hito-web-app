export class LoadChatConversation {
  static readonly type = '[ChatConversation] Load chat conversation';

  constructor(public username: string, public payload: string) {}
}
