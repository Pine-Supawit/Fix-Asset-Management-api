import { BadRequestException } from '@nestjs/common';
import { validatePageNumber, validateType } from './validation';

describe('validatePageNumber', () => {
  it('should return number when valid string is provided', () => {
    expect(validatePageNumber('3')).toBe(3);
  });

  it('should return number when valid number is provided', () => {
    expect(validatePageNumber(5)).toBe(5);
  });

  it('should throw BadRequestException for non-numeric input', () => {
    expect(() => validatePageNumber('abc')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for negative numbers', () => {
    expect(() => validatePageNumber('-1')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for undefined input', () => {
    expect(() => validatePageNumber(undefined)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for null input', () => {
    expect(() => validatePageNumber(null)).toThrow(BadRequestException);
  });

  it('should return uppercase type with Capital letter', () => {
    expect(validateType('ABC')).toBe('ABC');
  });

  it('should return uppercase type when valid string is provided', () => {
    expect(validateType('abc')).toBe('ABC');
  });

  it('should throw BadRequestException when type is an empty string', () => {
    expect(() => validateType('')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when type is undefined', () => {
    expect(() => validateType(undefined as any)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when type is null', () => {
    expect(() => validateType(null as any)).toThrow(BadRequestException);
  });
});
