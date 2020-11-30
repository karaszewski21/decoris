import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-client-nav-filters",
  templateUrl: "./client-nav-filters.component.html",
  styleUrls: ["./client-nav-filters.component.scss"],
})
export class ClientNavFiltersComponent implements OnInit, OnChanges {
  @Input() filterList: Map<string, any[]>;
  @Input() businessProfilesFilterControl = new FormControl();
  @Input() citiesFilterControl = new FormControl();
  @Input() voivedeshipsFilterControl = new FormControl();

  @Output() getFilterListEvent = new EventEmitter();
  @Output() resetFilterEvent = new EventEmitter();
  @Output() startFilterEvent = new EventEmitter();
  @Output() selectedBusinessProfilesFilterEvent = new EventEmitter();
  @Output() selectedCitiesFilterEvent = new EventEmitter();
  @Output() selectedVoivedeshipsFilterEvent = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getFilterListEvent.emit();

    this.businessProfilesFilterControl.valueChanges.subscribe(
      (businessProfiles) => {
        this.selectedBusinessProfilesFilterEvent.emit(businessProfiles);
      }
    );

    this.citiesFilterControl.valueChanges.subscribe((cities) =>
      this.selectedCitiesFilterEvent.emit(cities)
    );

    this.voivedeshipsFilterControl.valueChanges.subscribe((voivedeships) =>
      this.selectedVoivedeshipsFilterEvent.emit(voivedeships)
    );
  }

  startFilter() {
    this.startFilterEvent.emit();
  }

  resetFilter() {
    this.resetFilterEvent.emit();
  }
}
