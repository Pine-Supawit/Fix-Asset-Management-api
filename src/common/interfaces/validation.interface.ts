export interface NumberValidator {
  (value: any): number;
}

export interface StringValidator {
  (value: string): string;
}

export interface DateValidator{
  (value: string): string;
}