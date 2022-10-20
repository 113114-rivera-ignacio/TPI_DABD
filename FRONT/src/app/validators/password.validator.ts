import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl) {
  if (control.value.password != control.value.confirmPassword) {
    return {
      pepe: true,
    };
  }
  return null;
}
