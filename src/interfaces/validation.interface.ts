export interface NumberValidator {
  (value: any): number;
}

export interface TypeValidator {
  (value: string): string;
}

export interface StringValidator {
  (value: string): string;
}