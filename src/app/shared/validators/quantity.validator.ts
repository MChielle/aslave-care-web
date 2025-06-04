import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DecimalValidator {
  static decimal(maxDecimals: number = 2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === '') return null;

      const regex = new RegExp(`^[0-9]\\d{0,9}(\\.\\d{1,${maxDecimals}})?$`);
      const valid = regex.test(value);

      return valid ? null : { decimal: { valid: false, maxDecimals } };
    };
  }
}