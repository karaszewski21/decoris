import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getUsers,
  getAuthenticationLoading,
  UpdateUser,
  DeleteUser,
  GetUsers,
} from "src/app/setting/store";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/interfaces/account/user";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-setting-user-tab",
  templateUrl: "./setting-user-tab.component.html",
  styleUrls: ["./setting-user-tab.component.scss"],
})
export class SettingUserTabComponent implements OnInit {
  private configSuccess: MatSnackBarConfig = {
    duration: 1000,
    horizontalPosition: "center",
    verticalPosition: "top",
    panelClass: ["style-success"],
  };

  loadingSubscription$: Subscription;
  userFormGroup: FormGroup;
  user: User;

  toggleActiveAccount: boolean;

  users$ = this.store.select(getUsers);
  loading$ = this.store.select(getAuthenticationLoading);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  selectedUser({ value }) {
    this.user = null;
    this.user = value;

    this.userFormGroup.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    });
  }

  saveUser() {
    let user: User;
    user = { ...this.user, ...this.userFormGroup.value };

    if (this.userFormGroup.invalid) {
      this.openSnackBar("pola sa nie uzupelnione", "ok");
      return;
    }

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
        this.store.dispatch(new UpdateUser({ loading: true, user: user }));
        this.openSnackBar(
          `uzytkownik ${this.user.firstName} ${this.user.lastName} zostal zmieniony`,
          "ok"
        );
        this.resetUser();
      }
    });
  }

  removeUser() {
    if (this.userFormGroup.invalid) {
      this.openSnackBar("nie wybrano usera", "ok");
      return;
    }

    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Tak" },
        rejectButton: { show: true, value: "Nie" },
        information: {
          show: true,
          value: `Czy usunac ${this.user.firstName} ${this.user.lastName}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(new DeleteUser({ loading: true, user: this.user }));
        this.openSnackBar(
          `uzytkownik ${this.user.firstName} ${this.user.lastName} zostal usuniety`,
          "ok"
        );
        this.resetUser();
      }
    });
  }

  resetUser() {
    console.log(this.toggleActiveAccount);
    this.user = null;
    this.userFormGroup.reset();
    this.store.dispatch(new GetUsers({ loading: true }));
  }

  openSnackBar(message, button) {
    this.snackBar.open(message, button, this.configSuccess);
  }
}
