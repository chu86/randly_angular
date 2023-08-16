import { TestBed } from '@angular/core/testing';

import { BasicListService } from './basic-list.service';

describe('BasicListService', () => {
  let service: BasicListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
