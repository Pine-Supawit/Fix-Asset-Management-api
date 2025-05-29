import { BadRequestException } from '@nestjs/common';
import { NumberValidator, TypeValidator } from '../interfaces/validation.interface';

export function NumberValidator(num: number): number {
  if (!num || num <= 0) {
    throw new BadRequestException('Invalid type it should be a positive number');
  }
  return num;
}

export function TypeValidator(type: string): string {
  if (!type) {
    throw new BadRequestException('invalid type it should be a string');
  }
  return type.toUpperCase();
}
