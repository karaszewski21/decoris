import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-nav-filters",
  templateUrl: "./client-nav-filters.component.html",
  styleUrls: ["./client-nav-filters.component.scss"],
})
export class ClientNavFiltersComponent implements OnInit, OnChanges, OnDestroy {
  voivodeshipsFilterControl$: Subscription;
  citiesFilterControl$: Subscription;
  businessProfilesFilterControl$: Subscription;

  @Input() enableVoivodeshipsFilterControl: boolean;
  @Input() filterList: Map<string, any[]>;
  @Input() businessProfilesFilterControl = new FormControl();
  @Input() citiesFilterControl = new FormControl();
  @Input() voivodeshipsFilterControl = new FormControl();

  @Output() resetFilterEvent = new EventEmitter();
  @Output() startFilterEvent = new EventEmitter();
  @Output() selectedBusinessProfilesFilterEvent = new EventEmitter();
  @Output() selectedCitiesFilterEvent = new EventEmitter();
  @Output() selectedVoivedeshipsFilterEvent = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.enableVoivodeshipsFilterControl) {
      this.voivodeshipsFilterControl$ = this.voivodeshipsFilterControl.valueChanges.subscribe(
        (voivedeships) =>
          this.selectedVoivedeshipsFilterEvent.emit(voivedeships)
      );
    } else {
      this.voivodeshipsFilterControl$.unsubscribe();
    }

    this.enableVoivodeshipsFilterControl
      ? this.voivodeshipsFilterControl.enable()
      : this.voivodeshipsFilterControl.disable();
  }

  ngOnInit(): void {
    this.businessProfilesFilterControl$ = this.businessProfilesFilterControl.valueChanges.subscribe(
      (businessProfiles) => {
        this.selectedBusinessProfilesFilterEvent.emit(businessProfiles);
      }
    );

    this.citiesFilterControl$ = this.citiesFilterControl.valueChanges.subscribe(
      (cities) => this.selectedCitiesFilterEvent.emit(cities)
    );
  }

  ngOnDestroy(): void {
    this.businessProfilesFilterControl$.unsubscribe();
    this.citiesFilterControl$.unsubscribe();
    this.voivodeshipsFilterControl$.unsubscribe();
  }

  startFilter() {
    this.startFilterEvent.emit();
  }

  resetFilter() {
    this.resetFilterEvent.emit();
  }
}
