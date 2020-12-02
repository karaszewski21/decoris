import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  getCountries,
  AddParameter,
  RemoveParameter,
} from "../../../../../../core/store";
import { FormControl, Validators } from "@angular/forms";
import { Country } from "../../../../../../interfaces/client";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";

@Component({
  selector: "app-setting-country-tab",
  templateUrl: "./setting-country-tab.component.html",
  styleUrls: ["./setting-country-tab.component.scss"],
})
export class SettingCountryTabComponent implements OnInit {
  country: Country;
  countryControl: FormControl = new FormControl();
  countries$ = this.store.pipe(select(getCountries));

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  saveCountry() {
    if (!this.countryControl.dirty) {
      alert("Podaj nazwe panstwa przez zapisem");
      return;
    }

    if (this.country) {
      this.displayConfirmSaveDialog();
    } else {
      this.country = { id: null, name: this.countryControl.value };
      this.dispatchAddCountry(false);
    }
  }

  removeCountry() {
    if (this.country) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz  panstwo");
    }
  }

  selectedCountry({ value }) {
    this.country = value;
    this.countryControl.setValue(value.name);
  }

  resetCountry() {
    this.country = null;
    this.countryControl.setValue("");
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

      this.dispatchAddCountry(result);
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
          value: `Czy usunac ${this.country.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemoveCountry();
      }
    });
  }
  dispatchAddCountry(result) {
    if (result) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "country",
            value: { ...this.country, name: this.countryControl.value },
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "country",
            value: { id: null, name: this.countryControl.value },
          },
        })
      );
    }
    this.resetCountry();
  }

  dispatchRemoveCountry() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "country",
          value: this.country,
        },
      })
    );
  }
}
