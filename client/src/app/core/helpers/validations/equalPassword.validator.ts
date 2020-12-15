import { AbstractControl, ValidatorFn } from "@angular/forms";

export function equalValidate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value?.toLowerCase() === "blue"
      ? null
      : { wrongColor: control.value };
}
