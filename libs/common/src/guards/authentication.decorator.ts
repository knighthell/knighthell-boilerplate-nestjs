import { SetMetadata } from '@nestjs/common';

export const IS_AUTHENTICATION_DECORATOR_KEY =
  'IS_AUTHENTICATION_DECORATOR_KEY';
export const Authentication = (type: AuthenticationType | string) =>
  SetMetadata(IS_AUTHENTICATION_DECORATOR_KEY, type);

export enum AuthenticationType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}
