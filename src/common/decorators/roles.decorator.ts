import { Reflector } from '@nestjs/core';

export enum Role {
  User = 'user',
  Admin = 'admin',
}
export const roles = Reflector.createDecorator<Role[]>();
