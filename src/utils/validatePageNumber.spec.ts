import { BadRequestException } from '@nestjs/common';
import { NumberValidator, TypeValidator } from './validation';

describe('validation', () => {
  it('should return the number if it is a positive number', () => {
    expect(NumberValidator(1)).toBe(1);
    expect(NumberValidator(100)).toBe(100);
  });

  it('should throw BadRequestException if the number is 0', () => {
    expect(() => NumberValidator(0)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if the number is negative', () => {
    expect(() => NumberValidator(-5)).toThrow(BadRequestException);
    expect(() => NumberValidator(-1)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if the number is NaN', () => {
    expect(() => NumberValidator(NaN)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if the number is undefined', () => {
    expect(() => NumberValidator(undefined as any)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if the number is null', () => {
    expect(() => NumberValidator(null as any)).toThrow(BadRequestException);
  });

  it('should return uppercase type with Capital letter', () => {
    expect(TypeValidator('ABC')).toBe('ABC');
  });

  it('should return uppercase type when valid string is provided', () => {
    expect(TypeValidator('abc')).toBe('ABC');
  });

  it('should throw BadRequestException when type is an empty string', () => {
    expect(() => TypeValidator('')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when type is undefined', () => {
    expect(() => TypeValidator(undefined as any)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when type is null', () => {
    expect(() => TypeValidator(null as any)).toThrow(BadRequestException);
  });
});
