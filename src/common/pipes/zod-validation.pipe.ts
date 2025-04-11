import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any, _metadata: ArgumentMetadata) {
    try {
      const parsedValue: unknown = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.message, {
          cause: error,
        });
      }
      throw new BadRequestException('An unexpected validation error occured', {
        cause: error,
      });
    }
  }
}
