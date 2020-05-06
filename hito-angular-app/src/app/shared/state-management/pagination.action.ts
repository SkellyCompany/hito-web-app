import { PaginationQuery } from './../models/pagination-query.model';

export class InitLocalChatData {
  static readonly type = '[PaginationQuery] Init Local Chat Data';

  constructor(public payload: PaginationQuery) {}
}

export class InitHistoryData {
  static readonly type = '[PaginationQuery] Init History Data';

  constructor(public payload: PaginationQuery) {}
}

export class LoadNextPage {
  static readonly type = '[Pagination] Load Next Page';

  constructor() {}
}
