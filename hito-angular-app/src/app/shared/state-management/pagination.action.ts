import { PaginationQuery } from './../models/pagination-query.model';

export class Init {
  static readonly type = '[PaginationQuery] Init';

  constructor(public payload: PaginationQuery) {}
}

export class LoadNextPage {
  static readonly type = '[Pagination] Load Next Page';

  constructor() {}
}
