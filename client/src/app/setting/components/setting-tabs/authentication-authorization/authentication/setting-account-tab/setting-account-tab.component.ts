import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getAccounts,
  getAuthenticationLoading,
  UpdateAccount,
  GetAccounts,
  DeleteAccount,
  ActiveAccountSuccess,
  ActiveAccount,
} from "src/app/setting/store";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Account } from "src/app/interfaces/account/account";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { equalValidate } from "src/app/core/helpers/validations/equal.validator";

@Component({
  selector: "app-setting-account-tab",
  templateUrl: "./setting-account-tab.component.html",
  styleUrls: ["./setting-account-tab.component.scss"],
})
export class SettingAccountTabComponent implements OnInit {
  passwordPattern: string =
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  loadingSubscription$: Subscription;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  passwordControl: FormControl;
  account: Account = null;
  hide = true;

  accounts$ = this.store.select(getAccounts);
  loading$ = this.store.select(getAuthenticationLoading);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passwordControl = new FormControl("", [
      Validators.required,
      Validators.pattern(this.passwordPattern),
    ]);

    this.passwordFormGroup = new FormGroup(
      {
        password: this.passwordControl,
        confirmPassword: new FormControl("", Validators.required),
      },
      equalValidate
    );

    this.accountFormGroup = new FormGroup({
      login: new FormControl("", Validators.required),
      passwordFormGroup: this.passwordFormGroup,
    });

    this.resetAccount();
  }

  toggle(event: MatSlideToggleChange) {
    let account: Account;
    if (event.checked) {
      account = { ...this.account, active: 1 };
    } else {
      account = { ...this.account, active: 0 };
    }

    this.store.dispatch(new ActiveAccount({ loading: true, account: account }));
    this.openSnackBar(
      `konto zostalo ${account ? "aktywowne" : "dezaktywowane"}`,
      "ok"
    );
    this.resetAccount();
  }

  selectedAccount({ value }) {
    this.account = null;
    this.account = value;

    this.accountFormGroup.enable();
    this.accountFormGroup.controls["login"].disable();

    this.accountFormGroup.setValue({
      login: this.account.login,
      passwordFormGroup: {
        password: null,
        confirmPassword: null,
      },
    });
  }

  saveAccount() {
    if (this.account === null) {
      this.openSnackBar("nie wybrano konta", "ok");
      return;
    }

    if (this.accountFormGroup.invalid) {
      this.openSnackBar("pola sa nie uzupelnione", "ok");
      return;
    }

    let account: Account;
    account = { ...this.account, password: this.passwordControl.value };

    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Tak" },
        rejectButton: { show: true, value: "Nie" },
        information: {
          show: true,
          value: `Czy zamienić wprowadzone dane ?`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new UpdateAccount({ loading: true, account: account })
        );
        this.openSnackBar(
          `konto ${this.account.login} zostalo zmienione`,
          "ok"
        );
        this.resetAccount();
      }
    });
  }
  removeAccoun() {
    if (this.account === null) {
      this.openSnackBar("nie wybrano konta", "ok");
      return;
    }

    let account: Account;
    account = { ...this.account, ...this.accountFormGroup.value };

    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Tak" },
        rejectButton: { show: true, value: "Nie" },
        information: {
          show: true,
          value: `Czy usunac ${this.account.login}?`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new DeleteAccount({ loading: true, account: account })
        );
        this.openSnackBar(`konto ${this.account.login} zostalo usuniete`, "ok");
        this.resetAccount();
      }
    });
  }

  resetAccount() {
    this.account = null;
    this.accountFormGroup.reset();
    this.store.dispatch(new GetAccounts({ loading: true }));
    this.accountFormGroup.disable();
  }

  openSnackBar(message, button) {
    this.snackBar.open(message, button, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
