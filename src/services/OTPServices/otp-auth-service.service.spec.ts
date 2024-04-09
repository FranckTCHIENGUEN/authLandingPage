import { TestBed } from '@angular/core/testing';

import { OtpAuthServiceService } from './otp-auth-service.service';

describe('OtpAuthServiceService', () => {
  let service: OtpAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
