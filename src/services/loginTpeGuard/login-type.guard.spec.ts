import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginTypeGuard } from './login-type.guard';

describe('loginTypeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginTypeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
