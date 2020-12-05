import { Component, OnInit } from "@angular/core";
import { PcvProfile } from "../../../../../../interfaces/client";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import {
  AddParameter,
  RemoveParameter,
  getPcvProfiles,
} from "../../../../../../core/store";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";

@Component({
  selector: "app-setting-pcv-profile-tab",
  templateUrl: "./setting-pcv-profile-tab.component.html",
  styleUrls: ["./setting-pcv-profile-tab.component.scss"],
})
export class SettingPcvProfileTabComponent implements OnInit {
  pcvProfile: PcvProfile;
  pcvProfileControl: FormControl = new FormControl();
  pcvProfiles$ = this.store.pipe(select(getPcvProfiles));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  savePcvProfile() {
    if (!this.pcvProfileControl.dirty) {
      alert("Podaj nazwe profulu PCV przez zapisem");
      return;
    }
    if (this.pcvProfile) {
      this.displayConfirmSaveDialog();
    } else {
      this.pcvProfile = {
        id: null,
        name: this.pcvProfileControl.value,
      };
      this.dispatchAddPcvProfile(false);
    }
  }

  removePcvProfile() {
    if (this.pcvProfile) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz profil alu");
    }
  }

  selectedPcvProfile({ value }) {
    this.pcvProfile = value;
    this.pcvProfileControl.setValue(value.name);
  }

  resetPcvProfile() {
    this.pcvProfile = null;
    this.pcvProfileControl.setValue("");
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

      this.dispatchAddPcvProfile(result);
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
          value: `Czy usunac ${this.pcvProfile.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemovePcvProfile();
      }
    });
  }
  dispatchAddPcvProfile(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "pcvProfile",
            value: {
              ...this.pcvProfile,
              name: this.pcvProfileControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "pcvProfile",
            value: { id: null, name: this.pcvProfileControl.value },
          },
        })
      );
    }
    this.resetPcvProfile();
  }

  dispatchRemovePcvProfile() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "pcvProfile",
          value: this.pcvProfile,
        },
      })
    );
  }
}
