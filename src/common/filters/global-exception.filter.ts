import { UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let status = 500;
    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof UniqueConstraintViolationException) {
      status = 400;
      message = `Unique constraint violation. Key${exception.message.split('Key')[1]}`;
    }
    const stack = this.getStack(exception);

    this.logger.error(`Exception thrown: ${message}`, stack);
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
  private getStack(exception: unknown): string | undefined {
    if (
      typeof exception === 'object' &&
      exception !== null &&
      'stack' in exception
    ) {
      return (exception as { stack: string }).stack;
    }
    return undefined;
  }
}
