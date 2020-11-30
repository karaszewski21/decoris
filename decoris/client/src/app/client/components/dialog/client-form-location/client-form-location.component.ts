import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Country, City, Voivodeship } from "../../../../interfaces/client";

@Component({
  selector: "app-client-form-location",
  templateUrl: "./client-form-location.component.html",
  styleUrls: ["./client-form-location.component.scss"],
})
export class ClientFormLocationComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() countryControl: FormControl;
  @Input() cityControl: FormControl;

  @Input() selectedVoivodeship: Voivodeship;
  @Input() disabledCity: boolean;

  @Input() countryList: Country[];
  @Input() cityList: City[];

  @Output() selectedCountryEvent = new EventEmitter<Country>();
  @Output() selectedCityEvent = new EventEmitter<City>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.countryControl.valueChanges.subscribe((country) => {
      this.selectedCountryEvent.emit(country);
    });

    this.cityControl.valueChanges.subscribe((city) => {
      this.selectedCityEvent.emit(city);
    });
  }
}
