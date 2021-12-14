import { TestBed } from '@angular/core/testing';

import { RefreshProjectListService } from './refresh-project-list.service';

describe('RefreshProjectListService', () => {
  let service: RefreshProjectListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshProjectListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
