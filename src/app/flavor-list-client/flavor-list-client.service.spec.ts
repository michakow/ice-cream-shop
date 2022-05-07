import { TestBed } from '@angular/core/testing';

import { FlavorListClientService } from './flavor-list-client.service';

describe('FlavorListClientService', () => {
  let service: FlavorListClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlavorListClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
