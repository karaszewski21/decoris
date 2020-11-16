import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  AluminiumProfile,
  AluminiumFitting,
  PcvProfile,
  PcvFitting,
} from "../../../../interfaces/client";

@Component({
  selector: "app-client-form-fittings-profiles",
  templateUrl: "./client-form-fittings-profiles.component.html",
  styleUrls: ["./client-form-fittings-profiles.component.scss"],
})
export class ClientFormFittingsProfilesComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @Input() aluminiumProfileList: AluminiumProfile[];
  @Input() selectedAluminiumProfileList: string[];
  @Input() aluminiumProfileControl: FormControl;
  @Output() selectedAluminiumProfileEvent = new EventEmitter<string[]>();

  @Input() aluminiumFittingList: AluminiumFitting[];
  @Input() selectedAluminiumFittingList: string[];
  @Input() aluminiumFittingControl: FormControl;
  @Output() selectedAluminiumFittingEvent = new EventEmitter<string[]>();

  @Input() pcvProfileList: PcvProfile[];
  @Input() selectedPcvProfileList: string[];
  @Input() pcvProfileControl: FormControl;
  @Output() selectedPcvProfileEvent = new EventEmitter<string[]>();

  @Input() pcvFittingList: PcvFitting[];
  @Input() selectedPcvFittingList: string[];
  @Input() pcvFittingControl: FormControl;
  @Output() selectedPcvFittingEvent = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {
    this.aluminiumProfileControl.setValue(this.selectedAluminiumProfileList);
    this.aluminiumFittingControl.setValue(this.selectedAluminiumFittingList);
    this.pcvProfileControl.setValue(this.selectedPcvProfileList);
    this.pcvFittingControl.setValue(this.selectedPcvFittingList);
  }

  selectedAluminiumProfile(value) {
    this.selectedAluminiumProfileEvent.emit(value);
  }
  selectedAluminiumFitting(value) {
    this.selectedAluminiumFittingEvent.emit(value);
  }
  selectedPcvProfile(value) {
    this.selectedPcvProfileEvent.emit(value);
  }
  selectedPcvFitting(value) {
    this.selectedPcvFittingEvent.emit(value);
  }
}
