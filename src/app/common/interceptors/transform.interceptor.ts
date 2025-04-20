import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { SetMessage } from '../decorators/set-message.decorator';

export interface FormattedResponse<T> {
  success: boolean;
  statusCode: HttpStatus;
  message: string;
  timeStamp: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, FormattedResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<FormattedResponse<T>> {
    const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;
    const message = this.reflector.get(SetMessage, context.getHandler());
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        statusCode,
        message,
        timeStamp: JSON.stringify(new Date()),
        data,
      })),
    );
  }
}
