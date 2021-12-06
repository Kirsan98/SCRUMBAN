import { TestBed } from '@angular/core/testing';

import { RefreshProjectService } from './refresh-project.service';

describe('RefreshProjectService', () => {
  let service: RefreshProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
