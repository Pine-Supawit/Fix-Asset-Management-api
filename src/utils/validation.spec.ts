import { BadRequestException } from '@nestjs/common';
import { NumberValidator, TypeValidator, DateValidator } from './validation';

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

  it('should return the date string if valid (YYYY-MM-DD)', () => {
    expect(DateValidator('2025-05-30')).toBe('2025-05-30');
    expect(DateValidator('2000-01-01')).toBe('2000-01-01');
  });

  it('should throw if date is not in YYYY-MM-DD format', () => {
    expect(() => DateValidator('2025/05/30')).toThrow(BadRequestException);
    expect(() => DateValidator('30-05-2025')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-5-30')).toThrow(BadRequestException);
    expect(() => DateValidator('20250530')).toThrow(BadRequestException);
    expect(() => DateValidator('')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-05-30T00:00:00')).toThrow(BadRequestException);
  });

  it('should throw if date is not a real calendar date', () => {
    expect(() => DateValidator('2025-02-29')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-04-31')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-13-01')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-00-10')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-01-00')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-01-32')).toThrow(BadRequestException);
  });

  it('should throw if date is NaN, empty, or invalid', () => {
    expect(() => DateValidator('abcd-ef-gh')).toThrow(BadRequestException);
    expect(() => DateValidator('2025-02-30')).toThrow(BadRequestException);
    expect(() => DateValidator('')).toThrow(BadRequestException);
  });

  it('should throw if input is null or undefined', () => {
    expect(() => DateValidator(undefined as any)).toThrow(BadRequestException);
    expect(() => DateValidator(null as any)).toThrow(BadRequestException);
  });

});
