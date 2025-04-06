import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormatHelper {
    phoneNumberFormatter = (phoneNumber: string): string  => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.length === 11) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
        } else if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
        }
        return phoneNumber;
    }
}