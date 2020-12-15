import { Component, OnInit } from "@angular/core";
import { PositionEmployee } from "../../../../../../interfaces/client";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import {
  AddParameter,
  RemoveParameter,
  getPositionEmployees,
} from "../../../../../../store";

@Component({
  selector: "app-setting-position-employee-tab",
  templateUrl: "./setting-position-employee-tab.component.html",
  styleUrls: ["./setting-position-employee-tab.component.scss"],
})
export class SettingPositionEmployeeTabComponent implements OnInit {
  positionEmployee: PositionEmployee;
  positionEmployeeControl: FormControl = new FormControl();
  positionEmployees$ = this.store.pipe(select(getPositionEmployees));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  savePositionEmployee() {
    if (!this.positionEmployeeControl.dirty) {
      alert("Podaj nazwe profulu PCV przez zapisem");
      return;
    }
    if (this.positionEmployee) {
      this.displayConfirmSaveDialog();
    } else {
      this.positionEmployee = {
        id: null,
        name: this.positionEmployeeControl.value,
      };
      this.dispatchAddPositionEmployee(false);
    }
  }

  removePositionEmployee() {
    if (this.positionEmployee) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz profil alu");
    }
  }

  selectedPositionEmployee({ value }) {
    this.positionEmployee = value;
    this.positionEmployeeControl.setValue(value.name);
  }

  resetPositionEmployee() {
    this.positionEmployee = null;
    this.positionEmployeeControl.setValue("");
  }

  displayConfirmSaveDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Zamien" },
        rejectButton: { show: true, value: "Dodaj" },
        information: { show: false },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === null) {
        return;
      }

      this.dispatchAddPositionEmployee(result);
    });
  }

  displayConfirmRemoveDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Tak" },
        rejectButton: { show: true, value: "Nie" },
        information: {
          show: true,
          value: `Czy usunac ${this.positionEmployee.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemovePositionEmployee();
      }
    });
  }
  dispatchAddPositionEmployee(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "positionEmployee",
            value: {
              ...this.positionEmployee,
              name: this.positionEmployeeControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "positionEmployee",
            value: { id: null, name: this.positionEmployeeControl.value },
          },
        })
      );
    }
    this.resetPositionEmployee();
  }

  dispatchRemovePositionEmployee() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "positionEmployee",
          value: this.positionEmployee,
        },
      })
    );
  }
}
