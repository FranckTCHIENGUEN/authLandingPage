/* tslint:disable */
/* eslint-disable */
import { DefaultEmail } from '../../models/default-email';
import { DefaultFisrtName } from '../../models/default-fisrt-name';
import { DefaultLastName } from '../../models/default-last-name';
export interface UserCreateFields {
  email: DefaultEmail;
  firstName: DefaultFisrtName;
  lastName?: DefaultLastName;
  password?: string;
  phoneNumber: string;
  region: string;
}
