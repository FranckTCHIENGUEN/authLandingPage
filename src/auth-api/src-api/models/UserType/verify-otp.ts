/* tslint:disable */
/* eslint-disable */
import { DefaultEmail } from '../../models/default-email';
import { DefaultOtp } from '../../models/default-otp';
import { VerifType } from '../../models/verif-type';
export interface VerifyOtp {
  email: DefaultEmail;
  otp: DefaultOtp;
  verificationType: VerifType;
}
