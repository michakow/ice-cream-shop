import { TestBed } from '@angular/core/testing';

import { FormAddUnitService } from './form-add-unit.service';

describe('FormAddUnitService', () => {
  let service: FormAddUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAddUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
