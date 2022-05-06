import { TestBed } from '@angular/core/testing';

import { FormAddFlavorService } from './form-add-flavor.service';

describe('FormAddFlavorService', () => {
  let service: FormAddFlavorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAddFlavorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
