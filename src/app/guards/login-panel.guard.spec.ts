import { TestBed } from '@angular/core/testing';

import { LoginPanelGuard } from './login-panel.guard';

describe('LoginPanelGuard', () => {
  let guard: LoginPanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginPanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
