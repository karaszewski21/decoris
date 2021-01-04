import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";

import {
  City,
  Country,
  Voivodeship,
} from "../../../../../../interfaces/client";
import { CountryEnum } from "../../../../../../core/enums/client/countries";
import { FormControl } from "@angular/forms";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import {
  getCities,
  getCountries,
  getVoivodeships,
  GetCitiesByCountry,
  AddParameter,
  RemoveParameter,
} from "../../../../../../store";

@Component({
  selector: "app-setting-city-tab",
  templateUrl: "./setting-city-tab.component.html",
  styleUrls: ["./setting-city-tab.component.scss"],
})
export class SettingCityTabComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  selectedExistCity: boolean = false;
  selectedExistVoivodeship: boolean = false;
  selectedPolishMarket: boolean = false;

  country: Country = null;
  city: City = null;
  voivodeship: string = null;

  disabledCitySelect: boolean = true;
  disabledCityInput: boolean = true;
  disabledVoivodeshipSelect: boolean = true;
  showVoivodeshipSelect: boolean = false;
  selectVoivodeship: Voivodeship;

  cityControl: FormControl = new FormControl();
  voivodeshipControl: FormControl = new FormControl();

  cities$ = this.store.pipe(select(getCities));
  countries$ = this.store.pipe(select(getCountries));
  voivodeships$ = this.store.pipe(select(getVoivodeships));

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cityControl.disable();
    this.cityControl.valueChanges.subscribe(() => {
      this.disabledVoivodeshipSelect = false;
    });
  }
  saveCity() {
    let association = [];

    if (this.cityControl.value == null) {
      this.openSnackBar("Podaj nazwe miasta przez zapisem", "Ok");
      return;
    }
    //only polish market
    if (this.selectedPolishMarket && this.voivodeshipControl.value === null) {
      this.openSnackBar("wybierz wojewodztwo", "Ok");
      return;
    }

    if (this.country.id === 1) {
      association.push({ country: this.country });
      association.push({ voivodeship: this.voivodeship });
    } else {
      association.push({ country: this.country });
      association.push({ voivodeship: null });
    }

    if (this.selectedExistCity) {
      this.displayConfirmSaveDialog(association);
    } else {
      this.dispatchAddCity(false, association);
    }
  }
  resetCountryAndVoivodeship() {
    this.resetCity();
    this.resetVoivodeship();
    this.disabledVoivodeshipSelect = true;
  }

  resetControls() {
    this.selectedExistVoivodeship = false;
    this.disabledCitySelect = true;
    this.disabledCityInput = true;
    this.disabledVoivodeshipSelect = true;
    this.showVoivodeshipSelect = false;
  }

  resetCountry() {
    this.country = null;
  }

  resetCity() {
    this.city = null;
    this.selectedExistCity = false;
    this.cityControl.reset();
  }

  resetVoivodeship() {
    this.voivodeship = null;
    this.voivodeshipControl.reset();
  }

  removeCity() {
    if (this.selectedExistCity) {
      this.displayConfirmRemoveDialog();
    } else {
      this.openSnackBar("Wybierz miasto", "Ok");
    }
  }

  selectedCountry({ value }) {
    this.resetCountry();
    this.resetCity();
    this.resetVoivodeship();
    this.country = value;
    this.store.dispatch(
      new GetCitiesByCountry({ loading: true, countriesIds: [this.country.id] })
    );
    this.disabledCitySelect = false;
    this.cityControl.enable();

    if (this.country.id === 1) {
      this.showVoivodeshipSelect = true;
      this.selectedPolishMarket = true;
    } else {
      this.showVoivodeshipSelect = false;
      this.selectedPolishMarket = false;
    }
  }
  selectedVoivodeship({ value }) {
    this.voivodeship = value;
  }

  selectedCity({ value }) {
    this.resetCity();
    this.resetVoivodeship();
    this.selectedExistCity = true;
    this.city = value;
    this.cityControl.setValue(this.city.name);

    if (this.selectedPolishMarket) {
      this.voivodeship = value.voivodeship.name;
      this.voivodeshipControl.setValue(this.city.voivodeship.name);
    } else {
      this.voivodeship = null;
    }
  }

  displayConfirmSaveDialog(association) {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        confirmButton: { show: true, value: "Zamien" },
        rejectButton: { show: true, value: "Dodaj" },
        information: {
          show: true,
          value: `Czy dodać lub zmodyfikować ${this.city.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((modifyCity) => {
      if (modifyCity == null) {
        return;
      }

      if (modifyCity) {
        this.dispatchAddCity(modifyCity, association);
      } else {
        this.dispatchAddCity(modifyCity, association);
      }
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
          value: `Czy usunąć ${this.city.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if (remove) {
        this.dispatchRemoveCity();
      }
    });
  }

  openSnackBar(message, button) {
    this.snackBar.open(message, button, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  dispatchAddCity(modifyCity, association) {
    if (modifyCity) {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "city",
            value: { ...this.city, name: this.cityControl.value },
            association: association,
          },
        })
      );
    } else {
      this.store.dispatch(
        new AddParameter({
          loading: true,
          parameter: {
            name: "city",
            value: { id: null, name: this.cityControl.value },
            association: association,
          },
        })
      );
    }

    this.openSnackBar(`${this.cityControl.value} zostalo zapisane`, "Ok");
    this.resetCountry();
    this.resetCity();
    this.resetVoivodeship();
    this.resetControls();
  }

  dispatchRemoveCity() {
    this.store.dispatch(
      new RemoveParameter({
        loading: true,
        parameter: {
          name: "city",
          value: this.city,
        },
      })
    );
    this.openSnackBar(`${this.cityControl.value} zostalo usuniete`, "Ok");
    this.resetCountry();
    this.resetCity();
    this.resetVoivodeship();
    this.resetControls();
  }
}
