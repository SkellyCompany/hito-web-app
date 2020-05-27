export class LoadChatConversation {
  static readonly type = '[ChatConversation] Load chat conversation';

  constructor(public username: string, public payload: string) {}
}

export class LoadPrivateConversation {
  static readonly type = '[ChatConversation] Load private conversation';

  constructor(public firstInterlocutorId: string, public secondInterlocutorId: string) {}
}

export class LoadInterlocutor {
  static readonly type = '[ChatConversation] Load interlocutor';

  constructor(public interlocutorId: string) {}
}

// export class SendMessage {
//   static readonly type = '[ChatConversation] Send message';

//   constructor(public conversationId: string, public message: Message) {}
// }
