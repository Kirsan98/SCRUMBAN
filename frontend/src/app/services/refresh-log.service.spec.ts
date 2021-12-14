import { TestBed } from '@angular/core/testing';

import { RefreshLogService } from './refresh-log.service';

describe('RefreshLogService', () => {
  let service: RefreshLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
