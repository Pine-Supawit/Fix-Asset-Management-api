export interface NumberValidator {
  (value: any): number;
}

export interface TypeValidator {
  (value: string): string;
}
