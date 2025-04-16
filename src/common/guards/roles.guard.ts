import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role, roles } from '../decorators/roles.decorator';
import { Request } from 'express';

export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles =
      this.reflector.get(roles, context.getHandler()) ||
      this.reflector.get(roles, context.getClass());
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!requiredRoles) {
      return true;
    }
    if (!user) {
      throw new HttpException(
        'You are not logged in please log in to continue.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return requiredRoles.includes(user?.role);
  }
}
