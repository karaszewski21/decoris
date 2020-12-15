import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AluminiumProfile } from "../../../../../../interfaces/client";
import { select, Store } from "@ngrx/store";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import {
  getAluminiumProfiles,
  AddParameter,
  RemoveParameter,
} from "../../../../../../store";

@Component({
  selector: "app-setting-aluminium-profile-tab",
  templateUrl: "./setting-aluminium-profile-tab.component.html",
  styleUrls: ["./setting-aluminium-profile-tab.component.scss"],
})
export class SettingAluminiumProfileTabComponent implements OnInit {
  aluminiumProfile: AluminiumProfile;
  aluminiumProfileControl: FormControl = new FormControl();
  aluminiumProfiles$ = this.store.pipe(select(getAluminiumProfiles));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  saveAluminiumProfile() {
    if (!this.aluminiumProfileControl.dirty) {
      alert("Podaj nazwe profilu Alu przez zapisem");
      return;
    }

    if (this.aluminiumProfile) {
      this.displayConfirmSaveDialog();
    } else {
      this.aluminiumProfile = {
        id: null,
        name: this.aluminiumProfileControl.value,
      };
      this.dispatchAddAluminiumProfile(false);
    }
  }

  removeAluminiumProfile() {
    if (this.aluminiumProfile) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz profil alu");
    }
  }

  selectedAluminiumProfile({ value }) {
    this.aluminiumProfile = value;
    this.aluminiumProfileControl.setValue(value.name);
  }

  resetAluminiumProfile() {
    this.aluminiumProfile = null;
    this.aluminiumProfileControl.setValue("");
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

      this.dispatchAddAluminiumProfile(result);
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
          value: `Czy usunac ${this.aluminiumProfile.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemoveAluminiumProfile();
      }
    });
  }
  dispatchAddAluminiumProfile(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "aluminiumProfile",
            value: {
              ...this.aluminiumProfile,
              name: this.aluminiumProfileControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "aluminiumProfile",
            value: { id: null, name: this.aluminiumProfileControl.value },
          },
        })
      );
    }
    this.resetAluminiumProfile();
  }

  dispatchRemoveAluminiumProfile() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "aluminiumProfile",
          value: this.aluminiumProfile,
        },
      })
    );
  }
}
