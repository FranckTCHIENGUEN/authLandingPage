import { TestBed } from '@angular/core/testing';

import { WelcomeGuardService } from './welcome-guard.service';

describe('WelcomeGuardService', () => {
  let service: WelcomeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
