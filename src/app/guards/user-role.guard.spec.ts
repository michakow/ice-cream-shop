import { TestBed } from '@angular/core/testing';

import { UserRoleGuard } from './user-role.guard';

describe('UserRoleGuard', () => {
  let guard: UserRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
