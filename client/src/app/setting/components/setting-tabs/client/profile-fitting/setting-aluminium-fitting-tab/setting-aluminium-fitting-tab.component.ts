import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AluminiumFitting } from "../../../../../../interfaces/client";
import { select, Store } from "@ngrx/store";
import {
  AddParameter,
  RemoveParameter,
  getAluminiumFittings,
} from "../../../../../../core/store";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";

@Component({
  selector: "app-setting-aluminium-fitting-tab",
  templateUrl: "./setting-aluminium-fitting-tab.component.html",
  styleUrls: ["./setting-aluminium-fitting-tab.component.scss"],
})
export class SettingAluminiumFittingTabComponent implements OnInit {
  aluminiumFitting: AluminiumFitting;
  aluminiumFittingControl: FormControl = new FormControl();
  aluminiumFittings$ = this.store.pipe(select(getAluminiumFittings));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  saveAluminiumFitting() {
    if (!this.aluminiumFittingControl.dirty) {
      alert("Podaj nazwe okucia Alu przez zapisem");
      return;
    }

    if (this.aluminiumFitting) {
      this.displayConfirmSaveDialog();
    } else {
      this.aluminiumFitting = {
        id: null,
        name: this.aluminiumFittingControl.value,
      };
      this.dispatchAddAluminiumFitting(false);
    }
  }

  removeAluminiumFitting() {
    if (this.aluminiumFitting) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz  panstwo");
    }
  }

  selectedAluminiumFitting({ value }) {
    this.aluminiumFitting = value;
    this.aluminiumFittingControl.setValue(value.name);
  }

  resetAluminiumFitting() {
    this.aluminiumFitting = null;
    this.aluminiumFittingControl.setValue("");
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

      this.dispatchAddAluminiumFitting(result);
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
          value: `Czy usunac ${this.aluminiumFitting.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemoveAluminiumFitting();
      }
    });
  }
  dispatchAddAluminiumFitting(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "aluminiumFitting",
            value: {
              ...this.aluminiumFitting,
              name: this.aluminiumFittingControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "aluminiumFitting",
            value: { id: null, name: this.aluminiumFittingControl.value },
          },
        })
      );
    }
    this.resetAluminiumFitting();
  }

  dispatchRemoveAluminiumFitting() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "aluminiumFitting",
          value: this.aluminiumFitting,
        },
      })
    );
  }
}
