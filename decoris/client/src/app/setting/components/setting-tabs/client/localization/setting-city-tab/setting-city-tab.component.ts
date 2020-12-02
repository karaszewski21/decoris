import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  getCities,
  getCountries,
  getVoivodeships,
  GetCitiesByCountry,
  AddParameter,
  RemoveParameter,
} from "../../../../../../core/store";
import {
  City,
  Country,
  Voivodeship,
} from "../../../../../../interfaces/client";
import { CountryEnum } from "../../../../../../core/enums/client/countries";
import { FormControl } from "@angular/forms";
import { DialogComponent } from "../../../../../../shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-setting-city-tab",
  templateUrl: "./setting-city-tab.component.html",
  styleUrls: ["./setting-city-tab.component.scss"],
})
export class SettingCityTabComponent implements OnInit {
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

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cityControl.disable();
    this.cityControl.valueChanges.subscribe(() => {
      this.disabledVoivodeshipSelect = false;
    });
  }
  saveCity() {
    if (!this.cityControl.dirty) {
      alert("Podaj nazwe miasta przez zapisem");
      return;
    }

    let association = [];

    if (this.country.name === CountryEnum.polish && this.voivodeship === null) {
      alert("wybierz wojewodztow");
    } else {
      association.push({ country: this.country });
      association.push({ voivodeship: this.voivodeship });
    }

    if (this.city) {
      this.displayConfirmSaveDialog(association);
    } else {
      this.dispatchAddCity(false, association);
    }
  }

  resetCity() {
    this.city = null;
    this.cityControl.setValue("");
    this.voivodeshipControl.setValue("");
  }

  removeCity() {
    if (this.city) {
      this.displayConfirmRemoveDialog();
    } else {
      alert("Wybierz  miasto");
    }
  }

  selectedCountry({ value }) {
    this.country = value;
    this.store.dispatch(
      new GetCitiesByCountry({ loading: true, countriesIds: [this.country.id] })
    );
    this.disabledCitySelect = false;
    this.cityControl.enable();

    if (this.country.name === CountryEnum.polish) {
      this.showVoivodeshipSelect = true;
    } else {
      this.showVoivodeshipSelect = false;
    }
  }
  selectedVoivodeship({ value }) {
    this.voivodeship = value;
  }

  selectedCity({ value }) {
    this.city = value;
    this.voivodeship = value.voivodeship?.name;
    this.cityControl.setValue(this.city.name);
    this.voivodeshipControl.setValue(this.city.voivodeship?.name);
  }

  displayConfirmSaveDialog(association) {
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

      this.dispatchAddCity(result, association);
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
          value: `Czy usunac ${this.city.name}`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dispatchRemoveCity();
      }
    });
  }

  dispatchAddCity(result, association) {
    if (result) {
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
    this.resetCity();
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
    this.resetCity();
  }
}
