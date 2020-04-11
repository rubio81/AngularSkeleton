import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const PasswordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    return formGroup.get('newPassword').value === formGroup.get('confirmNewPassword').value ?
      null : { 'passwordMismatch': true };
}