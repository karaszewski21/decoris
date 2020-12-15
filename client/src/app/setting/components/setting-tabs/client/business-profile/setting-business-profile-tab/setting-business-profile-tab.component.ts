import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BusinessProfile } from "../../../../../../interfaces/client";
import { select, Store } from "@ngrx/store";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import {
  getBusinessProfiles,
  AddParameter,
  RemoveParameter,
} from "../../../../../../store";

@Component({
  selector: "app-setting-business-profile-tab",
  templateUrl: "./setting-business-profile-tab.component.html",
  styleUrls: ["./setting-business-profile-tab.component.scss"],
})
export class SettingBusinessProfileTabComponent implements OnInit {
  businessProfile: BusinessProfile;
  businessProfileControl: FormControl = new FormControl();
  businessProfiles$ = this.store.pipe(select(getBusinessProfiles));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  saveBusinessProfile() {
    if (!this.businessProfileControl.dirty) {
      alert("Podaj nazwe profilu przez zapisem");
      return;
    }

    if (this.businessProfile) {
      this.displayConfirmSaveDialog();
    } else {
      this.businessProfile = {
        id: null,
        name: this.businessProfileControl.value,
      };
      this.dispatchAddBusinessProfile(false);
    }
  }

  removeBusinessProfile() {
    if (this.businessProfile) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz  panstwo");
    }
  }

  selectedBusinessProfile({ value }) {
    this.businessProfile = value;
    this.businessProfileControl.setValue(value.name);
  }

  resetBusinessProfile() {
    this.businessProfile = null;
    this.businessProfileControl.setValue("");
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

      this.dispatchAddBusinessProfile(result);
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
          value: `Czy usunac ${this.businessProfile.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemoveBusinessProfile();
      }
    });
  }
  dispatchAddBusinessProfile(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "businessProfile",
            value: {
              ...this.businessProfile,
              name: this.businessProfileControl.value,
            },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "businessProfile",
            value: { id: null, name: this.businessProfileControl.value },
          },
        })
      );
    }
    this.resetBusinessProfile();
  }

  dispatchRemoveBusinessProfile() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "businessProfile",
          value: this.businessProfile,
        },
      })
    );
  }
}
