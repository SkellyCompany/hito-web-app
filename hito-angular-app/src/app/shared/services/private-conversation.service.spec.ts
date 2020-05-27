import { TestBed } from '@angular/core/testing';

import { PrivateConversationService } from './private-conversation.service';

describe('PrivateConversationService', () => {
  let service: PrivateConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
