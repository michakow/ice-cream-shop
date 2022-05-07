import { TestBed } from '@angular/core/testing';

import { FlavorListAdminService } from './flavor-list-admin.service';

describe('FlavorListAdminService', () => {
  let service: FlavorListAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlavorListAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
