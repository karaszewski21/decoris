import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Account } from "src/app/interfaces/account/account";
import { equalValidate } from "src/app/core/helpers/validations/login.validator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { RegisterAccount, LoginAccount, getAccount } from "src/app/store";
import { User } from "src/app/interfaces/account/user";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { debounce, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit, OnDestroy {
  passwordPattern: string =
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  registerToggle: boolean = true;
  account: Account;
  user: User;

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  passwordControl: FormControl;
  confirmPassword: FormControl;

  accountSubcription$: Subscription;
  account$ = this.store.select(getAccount);

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initControls();
  }

  ngOnDestroy(): void {
    this.accountSubcription$?.unsubscribe();
  }

  initControls() {
    this.passwordControl = new FormControl("", [
      Validators.required,
      Validators.pattern(this.passwordPattern),
    ]);

    this.confirmPassword = new FormControl("", [
      Validators.required,
      Validators.pattern(this.passwordPattern),
    ]);

    this.loginFormGroup = new FormGroup({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.registerFormGroup = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      login: new FormControl("", Validators.required),
      passwordGroup: new FormGroup(
        {
          password: this.passwordControl,
          confirmPassword: this.confirmPassword,
        },
        equalValidate
      ),
    });
  }

  login() {
    let { login, password } = this.loginFormGroup.value;

    this.account = {
      id: 0,
      login: login,
      password: password,
    };

    this.store.dispatch(
      new LoginAccount({ loading: true, account: this.account })
    );
  }

  register() {
    if (this.registerFormGroup.invalid) {
      this.openSnackBar("Nie wszystkie pola sa poprawne", "ok");
      return;
    }

    let { login, firstName, lastName, email } = this.registerFormGroup.value;

    this.account = {
      id: null,
      login: login,
      password: this.passwordControl.value,
    };

    this.user = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: null,
    };

    this.store.dispatch(
      new RegisterAccount({
        loading: true,
        account: this.account,
        user: this.user,
      })
    );

    this.spinner.show();
    this.accountSubcription$ = this.account$
      .pipe(debounceTime(1000))
      .subscribe((account) => {
        this.spinner.hide();
        if (account) {
          this.openSnackBar(`Konto ${account.login} zostalo zalozone`, "ok");
          this.registerFormGroup.reset();
        }
      });
  }

  openSnackBar(message, button) {
    this.snackBar.open(message, button, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
