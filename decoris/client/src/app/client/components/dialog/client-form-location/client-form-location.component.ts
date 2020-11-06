import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Country, City, Voivodeship } from "../../../../interfaces/client";

@Component({
  selector: "app-client-form-location",
  templateUrl: "./client-form-location.component.html",
  styleUrls: ["./client-form-location.component.scss"],
})
export class ClientFormLocationComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() countryControl: FormControl;
  @Input() cityControl: FormControl;
  @Input() voivodeshipControl: FormControl;

  @Input() selectedVoivodeship: Voivodeship;
  @Input() disabledCity: boolean;

  @Input() countryList: Map<string, Country>;
  @Input() cityList: Set<City>;
  @Input() voivodeshipList: Set<Voivodeship>;

  @Output() selectedCountryEvent = new EventEmitter<Country>();
  @Output() selectedCityEvent = new EventEmitter<City>();

  selectedCity: City;
  constructor() {}

  ngOnInit(): void {
    this.countryControl = new FormControl();
    this.cityControl = new FormControl();
    this.voivodeshipControl = new FormControl();

    this.countryControl.valueChanges.subscribe((country) => {
      console.log(country);
      this.selectedCountryEvent.emit(country);
    });

    this.cityControl.valueChanges.subscribe((city) => {
      console.log(city);
      this.selectedCityEvent.emit(city);
    });
  }
}
