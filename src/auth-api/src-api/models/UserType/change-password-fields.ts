/* tslint:disable */
/* eslint-disable */
import { DefaultEmail } from '../../models/default-email';
export interface ChangePasswordFields {
  email: DefaultEmail;
  newPassword: string;
  oldPassword?: string;
}
