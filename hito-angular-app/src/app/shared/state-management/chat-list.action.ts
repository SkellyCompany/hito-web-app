import { ChatListMode } from '../global-enums/chat-list-mode.enum';

export class LoadNextPage {
  static readonly type = '[Chat-List] Load Next Page';

  constructor() {}
}

export class SetChatListMode {
  static readonly type = '[Chat-List] Set Chat List Mode';

  constructor(public payload: ChatListMode, public loggedInUserUsername: string) {}
}
