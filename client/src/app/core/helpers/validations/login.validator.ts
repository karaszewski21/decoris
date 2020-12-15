import {
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";

export function equalValidate(
  passwordFormGroup: FormGroup
): { [key: string]: any } {
  const { password, confirmPassword } = passwordFormGroup.value;

  let valid = password === confirmPassword ? true : false;

  return valid ? null : { equal: true };
}
