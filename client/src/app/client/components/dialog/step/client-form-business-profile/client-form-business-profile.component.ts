import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BusinessProfile } from "../../../../../interfaces/client";

@Component({
  selector: "app-client-form-business-profile",
  templateUrl: "./client-form-business-profile.component.html",
  styleUrls: ["./client-form-business-profile.component.scss"],
})
export class ClientFormBusinessProfileComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() businessProfileList: BusinessProfile[];
  @Input() selectedBusinessProfileList: string[];
  @Input() businessProfileControl: FormControl;

  @Output() selectedBusinessProfileEvent = new EventEmitter<
    BusinessProfile[]
  >();
  constructor() {}

  ngOnInit(): void {
    this.businessProfileControl.setValue(this.selectedBusinessProfileList);
  }

  selectedBusinessProfile(value) {
    this.selectedBusinessProfileEvent.emit(value);
  }
}
