import { FormGroup, FormControl } from "@angular/forms";
import { AccountService } from "../../services/account/account.service";
import { timer } from "rxjs";
import { switchMap, map } from "rxjs/operators";

export const loginAsyncValidator = (
  accountService: AccountService,
  time: number = 500
) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => accountService.checkLogin(input.value)),
      map((res) => {
        return res ? { loginExist: true } : null;
      })
    );
  };
};
