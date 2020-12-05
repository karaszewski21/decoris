import { Component, OnInit } from "@angular/core";
import { PcvFitting } from "../../../../../../interfaces/client";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import {
  getPcvFittings,
  AddParameter,
  RemoveParameter,
} from "../../../../../../core/store";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";

@Component({
  selector: "app-setting-pcv-fitting-tab",
  templateUrl: "./setting-pcv-fitting-tab.component.html",
  styleUrls: ["./setting-pcv-fitting-tab.component.scss"],
})
export class SettingPcvFittingTabComponent implements OnInit {
  pcvFitting: PcvFitting;
  pcvFittingControl: FormControl = new FormControl();
  pcvFittings$ = this.store.pipe(select(getPcvFittings));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  savePcvFitting() {
    if (!this.pcvFittingControl.dirty) {
      alert("Podaj nazwe okucia PCV przez zapisem");
      return;
    }

    if (this.pcvFitting) {
      this.displayConfirmSaveDialog();
    } else {
      this.pcvFitting = {
        id: null,
        name: this.pcvFittingControl.value,
      };
      this.dispatchAddPcvFitting(false);
    }
  }

  removePcvFitting() {
    if (this.pcvFitting) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz profil alu");
    }
  }

  selectedPcvFitting({ value }) {
    this.pcvFitting = value;
    this.pcvFittingControl.setValue(value.name);
  }

  resetPcvFitting() {
    this.pcvFitting = null;
    this.pcvFittingControl.setValue("");
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

      this.dispatchAddPcvFitting(result);
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
          value: `Czy usunac ${this.pcvFitting.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemovePcvFitting();
      }
    });
  }
  dispatchAddPcvFitting(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "pcvFitting",
            value: {
              ...this.pcvFitting,
              name: this.pcvFittingControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "pcvFitting",
            value: { id: null, name: this.pcvFittingControl.value },
          },
        })
      );
    }
    this.resetPcvFitting();
  }

  dispatchRemovePcvFitting() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "pcvFitting",
          value: this.pcvFitting,
        },
      })
    );
  }
}
