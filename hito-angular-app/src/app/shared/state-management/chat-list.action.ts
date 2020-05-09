export class FindChatListItems {
  static readonly type = '[Chat-List] Find Chat List Items';

  constructor(public payload: string) {}
}

export class InitLocalUsersData {
  static readonly type = '[Chat-List] Init Local Users Data';

  constructor() {}
}

export class InitHistoryData {
  static readonly type = '[Chat-List] Init History Data';

  constructor(public payload: string) {}
}

export class LoadNextPage {
  static readonly type = '[Chat-List] Load Next Page';

  constructor() {}
}
