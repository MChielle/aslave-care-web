import * as dateFns from 'date-fns';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export module ValidatorHelper {
  export const minMaxHoursValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const openingTime = control.get('openingTime');
    const closingTime = control.get('closingTime');
    let openingTimeHour = openingTime.value.split(':')[0];
    let openingTimeMinute = openingTime.value.split(':')[1];
    let openingTimeDate = new Date().setHours(
      openingTimeHour,
      openingTimeMinute
    );

    let closingTimeHour = closingTime.value.split(':')[0];
    let closingTimeMinute = closingTime.value.split(':')[1];
    let closingTimeDate = new Date().setHours(
      closingTimeHour,
      closingTimeMinute
    );

    return dateFns.isAfter(openingTimeDate, closingTimeDate) ||
      dateFns.isBefore(closingTimeDate, openingTimeDate)
      ? { minMaxHours: true }
      : null;
  };

  export const checkPasswordsValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  export const fullNameValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let fullName = control.value;
    if (!fullName) {
      return null;
    }
    let isValid = fullName.match(
      /([a-zA-Z\u00C0-\u017F´]{1,} )([a-zA-Z\u00C0-\u017F´]{1,} )?([a-zA-Z\u00C0-\u017F´]{1,})/
    );
    return isValid ? null : { fullName: true };
  };

  export const isValidEmail: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValid = emailRegex.test(control.value);

    return isValid ? null : { invalidEmail: true };
  };

  export const validCpf: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const cpf = control.value;
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return { cpfNotValid: true };
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null;
      } else {
        return { cpfNotValid: true };
      }
    }
    return null;
  };

  export const validCnpj: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const cnpj = control.value;

    let isString = typeof cnpj === 'string';
    let validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj);

    if (!validTypes) return { cnpjNotValid: true };

    if (isString) {
      if (cnpj.length > 18) return { cnpjNotValid: true };

      let digitsOnly = /^\d{14}$/.test(cnpj);
      let validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj);

      if (digitsOnly || validFormat) true;
      else return { cnpjNotValid: true };
    }

    let match = cnpj.toString().match(/\d/g);
    let numbers = Array.isArray(match) ? match.map(Number) : [];

    if (numbers.length !== 14) return { cnpjNotValid: true };

    let items = [...new Set(numbers)];
    if (items.length === 1) return { cnpjNotValid: true };

    let calc = (x) => {
      let slice = numbers.slice(0, x);
      let factor = x - 7;
      let sum = 0;

      for (let i = x; i >= 1; i--) {
        let n = slice[x - i];
        sum += n * factor--;
        if (factor < 2) factor = 9;
      }

      let result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    };

    let digits = numbers.slice(12);

    let digit0 = calc(12);
    if (digit0 !== digits[0]) return { cnpjNotValid: true };

    return null;
  };

  export const requiredArrayValue: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const checkedArray = control.value;
    if (!checkedArray || checkedArray.length == 0) {
      return { requiredArrayValue: true };
    }

    return null;
  };
}
