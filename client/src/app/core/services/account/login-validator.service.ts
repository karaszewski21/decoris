import { Injectable } from "@angular/core";
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidator,
} from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, switchMap, tap, debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      switchMap((value) => {
        return this.http
          .get<boolean>(`${environment.apiUrl}account/login/${value}`)
          .pipe(
            map((result) => {
              if (result) {
                return { login: `${control.value} jest zajety` };
              } else {
                return null;
              }
            })
          );
      }),
      tap((value) => console.log(value))
    );
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
