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

export function DateValidator(dateStr: string): string {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(dateStr)) {
    throw new BadRequestException('Date must be in format YYYY-MM-DD');
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new BadRequestException('Invalid date');
  }

  //(parts match exactly (to avoid JS quirks like 2025-02-31 become March 2nd)
  const [year, month, day] = dateStr.split('-').map(Number);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    throw new BadRequestException('Invalid calendar date');
  }

  return dateStr;
}
