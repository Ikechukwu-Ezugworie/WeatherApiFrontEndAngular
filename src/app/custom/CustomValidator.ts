import {FormControl} from '@angular/forms';

export class CustomValidator {

  static isValidNameValidator(formControl: FormControl): { [s: string]: boolean } {
    if (!/^[A-Za-z\s]+$/.test(formControl.value)) {
      return {'inValidName': true};
    }
    return null;
  }

  static isValidFullNameValidator(formControl: FormControl): { [s: string]: boolean } {
    if (!/^([a-zA-Z' ]+)$/.test(formControl.value)) {
      return {'inValidName': true};
    }
    return null;
  }
}
