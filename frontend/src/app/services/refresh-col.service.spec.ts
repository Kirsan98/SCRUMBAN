import { TestBed } from '@angular/core/testing';

import { RefreshColService } from './refresh-col.service';

describe('RefreshColService', () => {
  let service: RefreshColService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshColService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
