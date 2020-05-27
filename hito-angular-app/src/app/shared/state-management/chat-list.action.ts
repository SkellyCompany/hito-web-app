import { ChatListMode } from '../global-enums/chat-list-mode.enum';

export class LoadNextPage {
  static readonly type = '[Chat-List] Load Next Page';

  constructor() {}
}

export class SetChatListMode {
  static readonly type = '[Chat-List] Set Chat List Mode';

  constructor(public payload: ChatListMode) {}
}

export class LoadLocalUsers {
  static readonly type = '[Chat-List] Load Local Users';

  constructor(public payload: string) {}
}
