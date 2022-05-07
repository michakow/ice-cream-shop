import { TestBed } from '@angular/core/testing';

import { UnitListService } from './unit-list.service';

describe('UnitListService', () => {
  let service: UnitListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
