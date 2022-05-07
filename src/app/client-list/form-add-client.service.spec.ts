import { TestBed } from '@angular/core/testing';

import { FormAddClientService } from './form-add-client.service';

describe('FormAddClientService', () => {
  let service: FormAddClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAddClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
