import { BadRequestException } from '@nestjs/common';

export function validatePageNumber(page: any): number {
  const pageNum = Number(page);
  if (isNaN(pageNum) || pageNum <= 0) {
    throw new BadRequestException('Invalid page');
  }
  return pageNum;
}

export function validateType(type: string): string {
  if (!type) {
    throw new BadRequestException('Type is required');
  }
  return type.toUpperCase();
}
